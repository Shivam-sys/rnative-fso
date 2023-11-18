import { Formik } from "formik";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";
import { ApolloError } from "@apollo/client";
import * as yup from "yup";
import useCreateReview from "../hooks/useCreateReview";
import { useNavigate } from "react-router-native";

const validationSchema = yup.object().shape({
  repoOwnerName: yup
    .string()
    .min(4, "Username must be at least 4 characters")
    .required("Repository owner name is required"),
  repoName: yup
    .string()
    .min(3, "Repository name must be at least 3 characters")
    .required("Repository name is required"),
  rating: yup
    .number("Rating must be a number")
    .required()
    .positive()
    .integer()
    .min(0, "Rating must be between 0 to 100")
    .max(100, "Rating must be between 0 to 100"),
  review: yup.string(),
});

const ReviewForm = () => {
  const [createReviewError, setCreateReviewError] = useState(false);
  const [createAReview] = useCreateReview();
  const navigate = useNavigate();

  const resetCreateReviewError = () => {
    // Clear the error message when an input field is clicked
    setCreateReviewError(false);
  };

  const onSubmit = async (values) => {
    const { repoOwnerName, repoName, rating, review = "" } = values;
    const cleanedReview = {
      repoOwnerName,
      repoName,
      rating: +rating, // converts numeric strings to number
      review,
    };
    try {
      await createAReview(cleanedReview).then((data) => {
        if (data && data?.createReview && data?.createReview?.repositoryId) {
          navigate(`/repository/${data?.createReview?.repositoryId}`);
        }
      });
    } catch (error) {
      if (error instanceof ApolloError) {
        const errorMessage = error.message;
        setCreateReviewError(errorMessage);
      } else {
        setCreateReviewError("An unexpected error occurred.");
        console.error("error:", error);
      }
    }
  };
  return (
    <Formik
      initialValues={{
        repoOwnerName: "",
        repoName: "",
        rating: "",
        review: "",
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isValid, dirty }) => (
        <View style={{ padding: 10, gap: 5 }}>
          <FormikTextInput
            name="repoOwnerName"
            placeholder="Repository owner name"
            onFocus={resetCreateReviewError}
          />
          <FormikTextInput
            name="repoName"
            placeholder="Repository name"
            onFocus={resetCreateReviewError}
          />
          <FormikTextInput
            name="rating"
            placeholder="Rating between 0 to 100"
            onFocus={resetCreateReviewError}
          />
          <FormikTextInput
            name="review"
            placeholder="Review"
            multiline={true}
            onFocus={resetCreateReviewError}
          />
          <Pressable
            onPress={handleSubmit}
            disabled={!isValid || !dirty}
            style={{
              height: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:
                !isValid || !dirty ? "grey" : theme.colors.primary,
              borderRadius: 5,
            }}
          >
            <Text color="white" fontWeight={"bold"}>
              Create a review
            </Text>
          </Pressable>
          {createReviewError && <Text color={"red"}>{createReviewError}</Text>}
        </View>
      )}
    </Formik>
  );
};

export default ReviewForm;
