import { useQuery } from "@apollo/client";
import { IS_LOGGED_IN } from "../graphql/queries";

const isSignedIn = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  return data && data.me && data.me.id;
};

export default isSignedIn;
