import { Formik } from "formik";
import Text from "./Text";
import { Pressable, View } from "react-native";
import theme from "../theme";
import FormikTextInput from "./FormikTextInput";
import { ApolloError } from "@apollo/client";
import useSignUp from "../hooks/useSignUp";
import { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import useSignIn from "../hooks/useSignIn";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be at least 5 characters")
    .max(30, "Username allowed at max 30 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 6 characters")
    .max(30, "Password allowed at max 30 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Confirm password not matching.")
    .required("Password confirm is required"),
});

const SignUp = () => {
  const [signUpError, setSignUpError] = useState(false);
  const navigate = useNavigate();
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();

  const resetSignUpError = () => {
    // Clear the error message when an input field is clicked
    setSignUpError(false);
  };

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const data = await signUp({ username, password });
      if (data && data?.createUser && data?.createUser?.username) {
        try {
          const signIndata = await signIn({ username, password });
          if (signIndata.authenticate.accessToken) {
            navigate("/");
          }
        } catch (error) {
          const errorMessage =
            "Singed up successfully. Auto Login failed. \nKindly login manually with entered credentials.";
          if (error instanceof ApolloError) {
            const errorMessage = errorMessage + error.message;
          }
          setSignUpError(errorMessage);
        }
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        const errorMessage = error.message;
        setSignUpError(errorMessage);
      } else {
        setSignUpError("An unexpected error occurred.");
      }
    }
  };
  return (
    <Formik
      initialValues={{ username: "", password: "", confirmPassword: "" }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isValid, dirty }) => (
        <View style={{ padding: 10, gap: 5 }}>
          <FormikTextInput
            name="username"
            placeholder="Username"
            onFocus={resetSignUpError}
          />
          <FormikTextInput
            name="password"
            placeholder="Password"
            secureTextEntry
            onFocus={resetSignUpError}
          />
          <FormikTextInput
            name="confirmPassword"
            placeholder="Confirm your Password"
            secureTextEntry
            onFocus={resetSignUpError}
          />
          <Pressable
            onPress={handleSubmit}
            disabled={!isValid || !dirty}
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
              Sign Up
            </Text>
          </Pressable>
          {signUpError && <Text color={"red"}>{signUpError}</Text>}
        </View>
      )}
    </Formik>
  );
};

export default SignUp;
