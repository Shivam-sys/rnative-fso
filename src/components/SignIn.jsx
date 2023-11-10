import { Pressable, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import * as yup from "yup";
// import Text from "./Text";
import { Formik } from "formik";
import theme from "../theme";
import Text from "./Text";

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

const SignIn = () => {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isValid, dirty }) => (
        <View style={{ padding: 10, gap: 5 }}>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput
            name="password"
            placeholder="Password"
            secureTextEntry
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
              Sign In
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;
