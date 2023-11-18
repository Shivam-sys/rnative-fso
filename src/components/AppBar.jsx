import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";
import { Link } from "react-router-native";
import isSignedIn from "../utils/isSignedIn";
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: theme.colors.secondary,
    paddingBottom: 15,
    paddingLeft: 10,
  },
  subHeading: {
    fontSize: 20,
  },
});

const AppBar = () => {
  const isLoggedIn = isSignedIn();

  const { signOut } = useSignIn();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text color="white" fontWeight={"bold"} style={styles.subHeading}>
            Repositories
          </Text>
        </Link>

        {isLoggedIn && (
          <>
            <Link to="/createReview" style={{ marginLeft: 10 }}>
              <Text color="white" fontWeight={"bold"} style={styles.subHeading}>
                Create a review
              </Text>
            </Link>
            <Link to="/myReviews" style={{ marginLeft: 10 }}>
              <Text color="white" fontWeight={"bold"} style={styles.subHeading}>
                My reviews
              </Text>
            </Link>
          </>
        )}
        <Link
          to="/signin"
          style={{ marginLeft: 10 }}
          onPress={async () => {
            if (isLoggedIn) {
              try {
                await signOut();
              } catch (error) {
                console.log(error.message);
              }
            }
          }}
        >
          <>
            <Text color="white" fontWeight={"bold"} style={styles.subHeading}>
              {isLoggedIn ? "Sign Out" : "Sign In"}
            </Text>
          </>
        </Link>
        {!isLoggedIn && (
          <Link to="/signup" style={{ marginLeft: 10 }}>
            <>
              <Text color="white" fontWeight={"bold"} style={styles.subHeading}>
                Sign Up
              </Text>
            </>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
