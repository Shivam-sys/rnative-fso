import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    padding: 20,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  return (
    <>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id.toString()}
        renderItem={RepositoryItem}
      />
    </>
  );
};

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error?.message}</Text>;

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
