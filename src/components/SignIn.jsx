import { Pressable, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
// import Text from "./Text";
import { Formik } from "formik";
import theme from "../theme";
import Text from "./Text";

const SignIn = () => {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ handleSubmit }) => (
        <View style={{ padding: 10, gap: 10 }}>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput
            name="password"
            placeholder="Password"
            secureTextEntry
          />
          <Pressable
            onPress={handleSubmit}
            style={{
              height: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.colors.primary,
              borderRadius: 5,
            }}
          >
            <Text color="white">Sign In</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;
