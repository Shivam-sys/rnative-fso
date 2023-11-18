import { Pressable, StyleSheet, View } from "react-native";
import theme from "../theme";
import Text from "./Text";
import { parseISO, format } from "date-fns";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.white,
    padding: 10,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
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
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  redButton: {
    backgroundColor: "red",
  },
  blueButton: {
    backgroundColor: theme.colors.primary,
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

  const navigate = useNavigate();

  return (
    <View style={styles.wrapper} {...props}>
      <View style={styles.container}>
        <View style={styles.ratingContainer}>
          <Text color={theme.colors.primary}>{review.rating}</Text>
        </View>
        <View style={styles.container2}>
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
      {review?.showAction && (
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.blueButton]}
            onPress={() => navigate(`/repository/${review.repository.id}`)}
          >
            <Text color={"white"} fontWeight={"bold"}>
              View repository
            </Text>
          </Pressable>
          <Pressable style={[styles.button, styles.redButton]}>
            <Text color={"white"} fontWeight={"bold"}>
              Delete review
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
