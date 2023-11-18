import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";

const { useMutation } = require("@apollo/client");
const { SIGNIN } = require("../graphql/queries");

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [authenticate] = useMutation(SIGNIN);
  const signIn = async ({ username, password }) => {
    const { data } = await authenticate({
      variables: { credentials: { username, password } },
    });
    const accessToken = data?.authenticate?.accessToken;
    await authStorage.setAccessToken(accessToken);
    await apolloClient.resetStore();
    return data;
  };

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return { signIn, signOut };
};

export default useSignIn;
