import { Pressable, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import * as yup from "yup";
import { Formik } from "formik";
import theme from "../theme";
import Text from "./Text";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";
import { ApolloError } from "@apollo/client";
import { useState } from "react";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Username must be at least 4 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const SignInContainer = ({
  onSubmit,
  signInError = false,
  setSignInError = () => {},
}) => {
  const handleInputClick = () => {
    // Clear the error message when an input field is clicked
    setSignInError(false);
  };
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isValid, dirty }) => (
        <View style={{ padding: 10, gap: 5 }}>
          <FormikTextInput
            name="username"
            placeholder="Username"
            onFocus={handleInputClick}
          />
          <FormikTextInput
            name="password"
            placeholder="Password"
            secureTextEntry
            onFocus={handleInputClick}
          />
          <Pressable
            testID="signInButton"
            onPress={handleSubmit}
            // disabled={!isValid || !dirty}
            style={{
              height: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:
                !isValid || !dirty ? "grey" : theme.colors.primary,
              borderRadius: 5,
            }}
          >
            <Text color="white" fontWeight={"bold"}>
              Sign In
            </Text>
          </Pressable>
          {signInError && <Text color={"red"}>{signInError}</Text>}
        </View>
      )}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const [signInError, setSignInError] = useState(false);

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const data = await signIn({ username, password });
      if (data.authenticate.accessToken) {
        navigate("/");
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        const errorMessage = error.message;
        setSignInError(errorMessage);
      } else {
        setSignInError("An unexpected error occurred.");
        console.log("error:", error);
      }
    }
  };

  return (
    <SignInContainer
      onSubmit={onSubmit}
      signInError={signInError}
      setSignInError={setSignInError}
    />
  );
};

export default SignIn;
