import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://mini-project-react.hasura.app/v1/graphql",
  cache: new InMemoryCache({ addTypename: false }),
  headers: {
    "x-hasura-admin-secret":
      "0BJM4vxDtjP4vfBHtctsY1hfbVj1JlKwwoLIdLg9I63Xmq373uW36jI4YXB8Gnnt",
  },
});
