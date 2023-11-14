const { useMutation } = require("@apollo/client");
const { CREATE_REVIEW } = require("../graphql/queries");

const useCreateReview = () => {
  const [createReview] = useMutation(CREATE_REVIEW);

  const createAReview = async ({ repoOwnerName, repoName, rating, review }) => {
    const { data } = await createReview({
      variables: {
        review: {
          ownerName: repoOwnerName,
          repositoryName: repoName,
          rating,
          text: review,
        },
      },
    });
    return data;
  };
  return [createAReview];
};
export default useCreateReview;
