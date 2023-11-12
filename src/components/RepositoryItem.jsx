import { Image, Pressable, StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { valueInK } from "../utils";

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

const RepositoryItem = ({ item }) => (
  <View style={styles.wrapper} testID="repositoryItem">
    <View style={styles.container1}>
      <Image
        source={require("../../assets/react-logo.png")}
        style={styles.image}
      />
      <View style={styles.detailsContainer}>
        <Text fontWeight={"bold"}>{item.fullName}</Text>
        <Text color={"textSecondary"}>{item.description}</Text>
        <View>
          <Pressable style={styles.button}>
            <Text color={"white"}>{item.language}</Text>
          </Pressable>
        </View>
      </View>
    </View>
    <View style={styles.container2}>
      <View>
        <Text fontWeight={"bold"} style={{ textAlign: "center" }}>
          {valueInK(item.stargazersCount)}
        </Text>
        <Text color={"textSecondary"} style={{ textAlign: "center" }}>
          Stars
        </Text>
      </View>
      <View>
        <Text fontWeight={"bold"} style={{ textAlign: "center" }}>
          {valueInK(item.forksCount)}
        </Text>
        <Text color={"textSecondary"} style={{ textAlign: "center" }}>
          Forks
        </Text>
      </View>
      <View>
        <Text fontWeight={"bold"} style={{ textAlign: "center" }}>
          {item.reviewCount}
        </Text>
        <Text color={"textSecondary"} style={{ textAlign: "center" }}>
          Reviews
        </Text>
      </View>
      <View>
        <Text fontWeight={"bold"} style={{ textAlign: "center" }}>
          {item.ratingAverage}
        </Text>
        <Text color={"textSecondary"} style={{ textAlign: "center" }}>
          Rating
        </Text>
      </View>
    </View>
  </View>
);

export default RepositoryItem;
