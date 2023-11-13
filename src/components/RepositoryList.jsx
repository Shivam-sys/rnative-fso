import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import Text from "./Text";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    padding: 20,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories.edges
    ? repositories.edges.map((edge) => edge.node)
    : [];
  return (
    <>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(node) => {
          return (
            <Pressable onPress={() => navigate(`/repository/${node.item.id}`)}>
              <RepositoryItem item={node.item} />
            </Pressable>
          );
        }}
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
