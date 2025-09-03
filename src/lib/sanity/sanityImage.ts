import createImageUrlBuilder from "@sanity/image-url";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID!;
const dataset = process.env.SANITY_STUDIO_DATASET!;

const builder = createImageUrlBuilder({
  projectId,
  dataset,
});

export function urlFor(source: any) {
  return builder.image(source);
}