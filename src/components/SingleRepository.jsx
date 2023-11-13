import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import theme from "../theme";
import Text from "./Text";
import RepositoryItem from "./RepositoryItem";
import { ItemSeparator } from "./RepositoryList";
import { useParams } from "react-router-native";
import { useRepository, useRepositoryReviews } from "../hooks/useRepositories";
import { parseISO, format } from "date-fns";

const reviewStyles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.colors.white,
    padding: 10,
  },
  container1: {},
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

const RepositoryInfo = ({ repository, loading, error }) => {
  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error loading info </Text>;
  }
  return (
    <>
      <RepositoryItem item={repository} />
      <ItemSeparator />
    </>
  );
};

const ReviewItem = ({ review, loading, error }) => {
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
    <View style={reviewStyles.wrapper}>
      <View style={reviewStyles.container1}>
        <View style={reviewStyles.ratingContainer}>
          <Text color={theme.colors.primary}>{review.rating}</Text>
        </View>
      </View>
      <View style={reviewStyles.container2}>
        <Text fontWeight={"bold"}>{review.user.username}</Text>
        <Text color={"textSecondary"}>{formatDate(review.createdAt)}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  let { repoId } = useParams();
  const { repository, loading, error } = useRepository(repoId);
  const {
    repositoryReviews: reviews,
    loading: reviewLoading,
    error: reviewError,
  } = useRepositoryReviews(repoId);
  const reviewsNodes = reviews?.reviews?.edges
    ? reviews?.reviews?.edges?.map((edge) => edge.node)
    : [];
  return (
    <FlatList
      data={reviewsNodes}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryInfo
          repository={repository}
          loading={loading}
          error={error}
        />
      )}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem review={item} loading={reviewLoading} error={reviewError} />
      )}
    />
  );
};

export default SingleRepository;
