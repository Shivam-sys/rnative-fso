import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";

const isSignedIn = () => {
  const { data } = useQuery(GET_CURRENT_USER);
  console.info({ data });
  return data && data.me && data.me.id;
};

export default isSignedIn;
