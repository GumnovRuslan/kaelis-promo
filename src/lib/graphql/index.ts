/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: process.env.SANITY_ENDPOINT,
  headers: {
    Authorization: `Bearer ${process.env.SANITY_TOKEN}`,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
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