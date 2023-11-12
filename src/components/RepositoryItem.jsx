import { Image, Pressable, StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { valueInK } from "../utils";
import { useParams } from "react-router-native";
import { useRepository } from "../hooks/useRepositories";
import * as Linking from "expo-linking";

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.white,
    display: "flex",
    flexDirection: "column",
    padding: 10,
  },
  container1: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 10,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 5,
    backgroundColor: "gray",
  },
  detailsContainer: {
    gap: 5,
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 5,
  },
  largeButton: {
    padding: 10,
  },
  widthFitsContent: {
    alignSelf: "flex-start",
  },
  container2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 5,
    paddingTop: 10,
  },
});

const RepositoryItem = ({ item }) => {
  let { repoId } = useParams();

  const { repository, loading, error } = item
    ? { repository: item, loading: false, error: null }
    : useRepository(repoId);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error?.message}</Text>;
  }

  return (
    <View style={styles.wrapper} testID="repositoryItem">
      <View style={styles.container1}>
        <Image
          source={require("../../assets/react-logo.png")}
          style={styles.image}
        />
        <View style={styles.detailsContainer}>
          <Text fontWeight={"bold"}>{repository.fullName}</Text>
          <Text color={"textSecondary"}>{repository.description}</Text>
          <View>
            <Pressable style={[styles.button, styles.widthFitsContent]}>
              <Text color={"white"}>{repository.language}</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.container2}>
        <View>
          <Text fontWeight={"bold"} style={{ textAlign: "center" }}>
            {valueInK(repository.stargazersCount)}
          </Text>
          <Text color={"textSecondary"} style={{ textAlign: "center" }}>
            Stars
          </Text>
        </View>
        <View>
          <Text fontWeight={"bold"} style={{ textAlign: "center" }}>
            {valueInK(repository.forksCount)}
          </Text>
          <Text color={"textSecondary"} style={{ textAlign: "center" }}>
            Forks
          </Text>
        </View>
        <View>
          <Text fontWeight={"bold"} style={{ textAlign: "center" }}>
            {repository.reviewCount}
          </Text>
          <Text color={"textSecondary"} style={{ textAlign: "center" }}>
            Reviews
          </Text>
        </View>
        <View>
          <Text fontWeight={"bold"} style={{ textAlign: "center" }}>
            {repository.ratingAverage}
          </Text>
          <Text color={"textSecondary"} style={{ textAlign: "center" }}>
            Rating
          </Text>
        </View>
      </View>
      {repository?.url && (
        <Pressable
          style={[styles.button, styles.largeButton]}
          onPress={() => {
            Linking.openURL(repository.url);
          }}
        >
          <Text
            color={"white"}
            fontWeight={"bold"}
            style={{ textAlign: "center" }}
          >
            Open in Github
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
