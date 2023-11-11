import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import { Navigate, Route, Routes } from "react-router-native";
import SignIn from "./SignIn";
import isSignedIn from "../utils/isSignedIn";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8",
  },
});

const Main = () => {
  const isLoggedIn = isSignedIn();
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<RepositoryList />} />
        ) : (
          <Route path="/" element={<SignIn />} />
        )}
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" elementr={<Navigate to="/" />} />
      </Routes>
    </View>
  );
};

export default Main;
