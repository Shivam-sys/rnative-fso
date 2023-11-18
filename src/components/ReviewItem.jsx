import { StyleSheet, View } from "react-native";
import theme from "../theme";
import Text from "./Text";
import { parseISO, format } from "date-fns";

const reviewStyles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.colors.white,
    padding: 10,
  },
  ratingContainer: {
    height: 60,
    width: 60,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  container2: {
    gap: 5,
    flex: 1,
  },
});

const ReviewItem = ({ review, loading, error, ...props }) => {
  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error loading review </Text>;
  }

  const formatDate = (dateString) => {
    const originalDateString = dateString;
    const originalDate = parseISO(originalDateString);
    return format(originalDate, "dd-MM-yyyy");
  };

  return (
    <View style={reviewStyles.wrapper} {...props}>
      <View style={reviewStyles.ratingContainer}>
        <Text color={theme.colors.primary}>{review.rating}</Text>
      </View>
      <View style={reviewStyles.container2}>
        {review?.user?.username && (
          <Text fontWeight={"bold"}>{review.user.username}</Text>
        )}
        {review?.repository?.fullName && (
          <Text fontWeight={"bold"}>{review.repository.fullName}</Text>
        )}
        <Text color={"textSecondary"}>{formatDate(review.createdAt)}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
