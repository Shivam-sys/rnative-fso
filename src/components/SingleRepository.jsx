import React from "react";
import { FlatList } from "react-native";
import Text from "./Text";
import RepositoryItem from "./RepositoryItem";
import { ItemSeparator } from "./RepositoryList";
import { useParams } from "react-router-native";
import { useRepository } from "../hooks/useRepositories";
import { useRepositoryReviews } from "../hooks/useReviews";
import ReviewItem from "./ReviewItem";

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
