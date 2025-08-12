import { GraphQLClient } from 'graphql-request';

const ENDPOINT = process.env.SANITY_ENDPOINT;
const TOKEN = process.env.SANITY_TOKEN;

if (!ENDPOINT || !TOKEN) {
  throw new Error(
    'Missing required environment variables: ENDPOINT and/or TOKEN',
  );
}

export const sanityApi = new GraphQLClient(ENDPOINT, {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});