import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import { Navigate, Route, Routes } from "react-router-native";
import SignIn from "./SignIn";
import isSignedIn from "../utils/isSignedIn";
// import RepositoryItem from "./RepositoryItem";
import SingleRepository from "./SingleRepository";
import ReviewForm from "./ReviewForm";
import SignUp from "./SignUp";
import MyReviews from "./MyReviews";

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
          <>
            <Route path="/" element={<RepositoryList />} />
            <Route path="/createReview" element={<ReviewForm />} />
            <Route path="/myReviews" element={<MyReviews />} />
          </>
        ) : (
          <>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/repository/:repoId" element={<SingleRepository />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </View>
  );
};

export default Main;
