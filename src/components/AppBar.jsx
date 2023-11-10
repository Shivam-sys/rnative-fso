import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";

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
      <Text color="white" fontWeight={"bold"} style={styles.subHeading}>
        Repositories
      </Text>
    </View>
  );
};

export default AppBar;
