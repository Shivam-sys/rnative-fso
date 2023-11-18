import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import SortingSelector from "./SortingSelector";
import SearchBox from "./SearchBox";
import { selectionOptions } from "../utils";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    padding: 20,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  buttonText,
  setSortValues,
  setSearchTerm,
}) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories.edges
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <PaperProvider>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <>
            <SearchBox setSearchTerm={setSearchTerm} />
            <SortingSelector
              setSortValues={setSortValues}
              buttonText={buttonText}
            />
          </>
        }
        renderItem={(node) => {
          return (
            <Pressable onPress={() => navigate(`/repository/${node.item.id}`)}>
              <RepositoryItem item={node.item} />
            </Pressable>
          );
        }}
      />
    </PaperProvider>
  );
};

const RepositoryList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortValues, setSortValues] = useState(selectionOptions[0]);

  const { repositories } = useRepositories(sortValues, searchTerm);

  return (
    <RepositoryListContainer
      repositories={repositories}
      buttonText={sortValues?.title}
      setSortValues={setSortValues}
      setSearchTerm={setSearchTerm}
    />
  );
};

export default RepositoryList;
