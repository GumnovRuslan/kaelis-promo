import { NextResponse } from "next/server";

const KLAVIYO_API_KEY = process.env.KLAVIYO_PRIVATE_KEY!;
const LIST_ID = process.env.KLAVIYO_LIST_ID!;
const REVISION = "2024-06-15";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, receive_release, receive_practices, practice_type, language } = body;

    if (!email) {
      return NextResponse.json({ status: "error", message: "Email is required" }, { status: 400 });
    }

    // ---------------------------------------------
    // 1. SEARCH PROFILE
    // ---------------------------------------------
    const searchRes = await fetch(
      `https://a.klaviyo.com/api/profiles?filter=equals(email,"${encodeURIComponent(email)}")`,
      {
        method: "GET",
        headers: {
          Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
          revision: REVISION,
        },
      }
    );

    if (!searchRes.ok) {
      return NextResponse.json({ status: "error", message: "Failed to search profile" }, { status: 500 });
    }

    const searchData = await searchRes.json();
    let profileId: string | null = null;
    let existingProps: any = null;

    if (searchData.data?.length > 0) {
      profileId = searchData.data[0].id;
      existingProps = searchData.data[0].attributes?.properties || null;
    }

    // ---------------------------------------------
    // 2. IF PROFILE EXISTS — check duplicate props
    // ---------------------------------------------
    if (profileId && existingProps) {
      const isDuplicate =
        existingProps.receive_release === !!receive_release &&
        existingProps.receive_practices === !!receive_practices &&
        (existingProps.practice_type ?? null) === (practice_type || null) &&
        (existingProps.language ?? "en") === (language || "en");

      if (isDuplicate) {
        return NextResponse.json({
          status: "already",
          message: "User already subscribed with same preferences",
          profileId,
        });
      }
    }

    // ---------------------------------------------
    // 3. IF PROFILE DOES NOT EXIST — create
    // ---------------------------------------------
    if (!profileId) {
      const createProfileRes = await fetch("https://a.klaviyo.com/api/profiles/", {
        method: "POST",
        headers: {
          Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
          "Content-Type": "application/json",
          revision: REVISION,
        },
        body: JSON.stringify({
          data: {
            type: "profile",
            attributes: { email },
          },
        }),
      });

      if (!createProfileRes.ok) {
        const err = await createProfileRes.text();
        console.error("Create profile error:", err);
        return NextResponse.json({ status: "error", message: "Failed to create profile" }, { status: 500 });
      }

      const createData = await createProfileRes.json();
      profileId = createData.data.id;
    }

    // ---------------------------------------------
    // 4. SUBSCRIBE PROFILE TO LIST
    // ---------------------------------------------
    const subscribeRes = await fetch(
      "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/",
      {
        method: "POST",
        headers: {
          Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
          "Content-Type": "application/json",
          revision: REVISION,
        },
        body: JSON.stringify({
          data: {
            type: "profile-subscription-bulk-create-job",
            relationships: {
              list: { data: { type: "list", id: LIST_ID } },
            },
            attributes: {
              profiles: {
                data: [{ type: "profile", attributes: { email } }],
              },
            },
          },
        }),
      }
    );

    if (!subscribeRes.ok) {
      const err = await subscribeRes.text();
      console.error("Subscribe error:", err);
      return NextResponse.json({ status: "error", message: "Failed to subscribe user" }, { status: 500 });
    }

    // ---------------------------------------------
    // 5. UPDATE PROFILE PROPERTIES
    // ---------------------------------------------
    const updateRes = await fetch(`https://a.klaviyo.com/api/profiles/${profileId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        "Content-Type": "application/json",
        revision: REVISION,
      },
      body: JSON.stringify({
        data: {
          type: "profile",
          id: profileId,
          attributes: {
            properties: {
              receive_release: !!receive_release,
              receive_practices: !!receive_practices,
              practice_type: practice_type || null,
              language: language || "en",
            },
          },
        },
      }),
    });

    if (!updateRes.ok) {
      const err = await updateRes.text();
      console.error("Update error:", err);
    }

    // ---------------------------------------------
    // 6. SUCCESS RESPONSE
    // ---------------------------------------------
    return NextResponse.json({
      status: existingProps ? "updated" : "success",
      message: "User subscribed successfully",
      profileId,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ status: "error", message: "Server error" }, { status: 500 });
  }
}
