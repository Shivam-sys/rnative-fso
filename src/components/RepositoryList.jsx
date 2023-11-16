import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import Text from "./Text";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import { Button, Menu, Provider as PaperProvider } from "react-native-paper";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    padding: 20,
  },
});

const orderBy = { createdAt: "CREATED_AT", ratingAverage: "RATING_AVERAGE" };
const orderDirection = { asc: "ASC", desc: "DESC" };

const SortingSelector = ({ sortValues, setSortValues }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const showMenu = () => setIsMenuVisible(true);
  const hideMenu = () => setIsMenuVisible(false);
  const [selection, setSelection] = useState(sortValues);
  const selectionOptions = [
    {
      title: "Latest repositories",
      values: {
        orderBy: orderBy.createdAt,
        orderDirection: orderDirection.desc,
      },
    },
    {
      title: "Oldest repositories",
      values: {
        orderBy: orderBy.createdAt,
        orderDirection: orderDirection.asc,
      },
    },
    {
      title: "Highest rated repositories",
      values: {
        orderBy: orderBy.ratingAverage,
        orderDirection: orderDirection.desc,
      },
    },
    {
      title: "Lowest rated repositories",
      values: {
        orderBy: orderBy.ratingAverage,
        orderDirection: orderDirection.asc,
      },
    },
  ];

  return (
    <View>
      <Menu
        visible={isMenuVisible}
        onDismiss={hideMenu}
        anchor={
          <Button onPress={showMenu}>
            {selection?.title ? `Sorted : ${selection?.title}` : "Select Sort"}
          </Button>
        }
      >
        {selectionOptions.map(
          (option) =>
            selection?.title !== option.title && (
              <Menu.Item
                key={option.title}
                onPress={async () => {
                  setSelection(option);
                  setSortValues(option);
                  hideMenu();
                }}
                title={option.title}
              />
            )
        )}
      </Menu>
    </View>
  );
};

export const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  setSortValues,
  sortValues,
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
          <SortingSelector
            setSortValues={setSortValues}
            sortValues={sortValues}
          />
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
  const [sortValues, setSortValues] = useState();
  const { repositories, loading, error } = useRepositories(sortValues);
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error?.message}</Text>;

  return (
    <RepositoryListContainer
      repositories={repositories}
      sortValues={sortValues}
      setSortValues={setSortValues}
    />
  );
};

export default RepositoryList;
