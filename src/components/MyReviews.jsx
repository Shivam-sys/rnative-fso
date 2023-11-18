import { FlatList } from "react-native";
import { useMyReviews } from "../hooks/useReviews";
import { ItemSeparator } from "./RepositoryList";
import ReviewItem from "./ReviewItem";
import { Link } from "react-router-native";
import Text from "./Text";

const MyReviews = () => {
  const {
    myReviews: reviews,
    loading: reviewLoading,
    error: reviewError,
  } = useMyReviews();
  const reviewsNodes = reviews?.edges
    ? reviews?.edges?.map((edge) => {
        return { ...edge.node, showAction: true };
      })
    : [];

  if (!reviewsNodes.length) {
    return (
      <Text>
        You haven{`'`}t created a Review yet.
        <Link to={"/createReview"}>
          <Text style={{ color: "blue" }}> Create One.</Text>
        </Link>
      </Text>
    );
  }

  return (
    <FlatList
      data={reviewsNodes}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => {
        return (
          <ReviewItem
            review={item}
            loading={reviewLoading}
            error={reviewError}
          />
        );
      }}
    />
  );
};

export default MyReviews;
