const { useMutation } = require("@apollo/client");
const { SIGNUP } = require("../graphql/queries");

const useSignUp = () => {
  const [createUser] = useMutation(SIGNUP);
  const signUp = async ({ username, password }) => {
    const { data } = await createUser({
      variables: { user: { username, password } },
    });
    return data;
  };

  return { signUp };
};

export default useSignUp;
