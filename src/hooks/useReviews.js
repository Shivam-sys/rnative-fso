import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER, GET_REPOSITORY_REVIEW } from "../graphql/queries";
import { useEffect, useState } from "react";

export const useRepositoryReviews = (repoId) => {
  const [repositoryReviews, setRepositoryReviews] = useState({});
  const { loading, error, data } = useQuery(GET_REPOSITORY_REVIEW, {
    variables: { id: repoId },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (data && data.repository) setRepositoryReviews(data.repository);
  }, [data]);

  return { repositoryReviews, loading, error };
};

export const useMyReviews = () => {
  const [myReviews, setMyReviews] = useState({});
  const { loading, error, data } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (data && data?.me && data?.me?.reviews) setMyReviews(data.me.reviews);
  }, [data]);

  return { myReviews, loading, error };
};
