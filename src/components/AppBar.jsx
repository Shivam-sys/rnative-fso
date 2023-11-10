import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";
import { Link } from "react-router-native";

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text color="white" fontWeight={"bold"} style={styles.subHeading}>
            Repositories
          </Text>
        </Link>
        <Link to="/signin" style={{ marginLeft: 10 }}>
          <Text color="white" fontWeight={"bold"} style={styles.subHeading}>
            Sign In
          </Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
