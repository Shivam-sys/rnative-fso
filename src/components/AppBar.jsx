import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";
import { Link } from "react-router-native";
import { useApolloClient, useQuery } from "@apollo/client";
import { IS_LOGGED_IN } from "../graphql/queries";
import { useEffect, useState } from "react";
import useAuthStorage from "../hooks/useAuthStorage";

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
  const { data } = useQuery(IS_LOGGED_IN);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(data && data.me && data.me.id);
  }, [data]);

  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Text color="white" fontWeight={"bold"} style={styles.subHeading}>
          Repositories
        </Text>
        <Link
          to="/signin"
          style={{ marginLeft: 10 }}
          onPress={async () => {
            if (isLoggedIn) await signOut();
          }}
        >
          <>
            <Text color="white" fontWeight={"bold"} style={styles.subHeading}>
              {isLoggedIn ? "Sign Out" : "Sign In"}
            </Text>
          </>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
