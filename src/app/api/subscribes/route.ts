import { NextResponse } from "next/server";

const KLAVIYO_API_KEY = process.env.KLAVIYO_PRIVATE_KEY!;
const LIST_ID = process.env.KLAVIYO_LIST_ID!;
const REVISION = "2024-06-15";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      email,
      mode = "full", // "full" | "simple"
      consent_site_updates,
      consent_release_promo,
      archetype_version,
      archetype_key,
      language,
      source,
    } = body;

    if (!email) {
      return NextResponse.json(
        { status: "error", message: "Email is required" },
        { status: 400 }
      );
    }

    // -------------------------------------------------------
    // 1) SEARCH PROFILE
    // -------------------------------------------------------
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
      return NextResponse.json(
        { status: "error", message: "Failed to search profile" },
        { status: 500 }
      );
    }

    const searchData = await searchRes.json();
    const isExisting = searchData.data?.length > 0;
    let profileId = isExisting ? searchData.data[0].id : null;
    let existingProps = isExisting ? searchData.data[0].attributes?.properties : null;

    // =======================================================
    // ============= MODE SIMPLE — ONLY EMAIL CHECK ===========
    // =======================================================
    if (mode === "simple") {
      if (isExisting) {
        return NextResponse.json({
          status: "already",
          message: "User already exists",
          profileId,
        });
      }

      // → USER DOES NOT EXIST → create
      const createRes = await fetch(`https://a.klaviyo.com/api/profiles/`, {
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

      if (!createRes.ok) {
        return NextResponse.json(
          { status: "error", message: "Failed to create profile" },
          { status: 500 }
        );
      }

      const createData = await createRes.json();
      profileId = createData.data.id;

      // → SUBSCRIBE TO LIST
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
                list: {
                  data: { type: "list", id: LIST_ID },
                },
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
        return NextResponse.json(
          { status: "error", message: "Failed to subscribe user" },
          { status: 500 }
        );
      }

      // → UPDATE MINIMAL PROPERTIES
      await fetch(`https://a.klaviyo.com/api/profiles/${profileId}`, {
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
                consent_site_updates: false,
                consent_release_promo: false,
                archetype_version: null,
                archetype_key: null,
                language: language || "en",
                source: "subscribe",
              },
            },
          },
        }),
      });

      return NextResponse.json({
        status: "success",
        message: "User subscribed",
        profileId,
      });
    }

    // =======================================================================
    // ======================== MODE FULL (MAIN FORM) =========================
    // =======================================================================

    // CHECK DUPLICATES BY PROPS
    const isDuplicate =
      isExisting &&
      existingProps &&
      existingProps.consent_site_updates === !!consent_site_updates &&
      existingProps.consent_release_promo === !!consent_release_promo &&
      (existingProps.archetype_version ?? null) === (archetype_version || null) &&
      (existingProps.language ?? "en") === (language || "en") &&
      existingProps.archetype_key === archetype_key &&
      existingProps.source === source;

    if (isDuplicate) {
      return NextResponse.json({
        status: "already",
        message: "User already subscribed with same preferences",
        profileId,
      });
    }

    // IF PROFILE DOES NOT EXIST — CREATE
    if (!isExisting) {
      const createRes = await fetch(`https://a.klaviyo.com/api/profiles/`, {
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

      if (!createRes.ok) {
        return NextResponse.json(
          { status: "error", message: "Failed to create profile" },
          { status: 500 }
        );
      }

      const createData = await createRes.json();
      profileId = createData.data.id;
    }

    // SUBSCRIBE USER
    await fetch(
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
              profiles: { data: [{ type: "profile", attributes: { email } }] },
            },
          },
        }),
      }
    );

    // UPDATE FULL PROPERTIES
    await fetch(`https://a.klaviyo.com/api/profiles/${profileId}`, {
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
              consent_site_updates: !!consent_site_updates,
              consent_release_promo: !!consent_release_promo,
              archetype_version: archetype_version || null,
              archetype_key: archetype_key,
              language: language || "en",
              source: source || "archetype_test_v1",
            },
          },
        },
      }),
    });

    return NextResponse.json({
      status: isExisting ? "updated" : "success",
      message: "User subscribed successfully",
      profileId,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { status: "error", message: "Server error" },
      { status: 500 }
    );
  }
}
