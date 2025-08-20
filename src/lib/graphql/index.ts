/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.SANITY_ENDPOINT,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.SANITY_TOKEN}`,
  },
});

export async function fetchGraphQL<T = any>(
  query: string,
  variables?: Record<string, any>,
): Promise<{ data: T; errors: any }> {
  try {
    const { data, errors } = await client.query({
      query: gql(query),
      variables,
    });
    return { data, errors };
  } catch (error: any) {
    console.log(error);
    return { data: null as T, errors: error.message };
  }
}