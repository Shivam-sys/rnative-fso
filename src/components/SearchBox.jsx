import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

const SearchBox = ({ setSearchTerm }) => {
  const [inputValue, setInputValue] = useState();

  let debounceTimer;
  const searchTermDebounce = (...args) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => setSearchTerm(...args), 500);
  };

  const onChange = (text) => {
    setInputValue(text);
    searchTermDebounce(text);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search..."
        value={inputValue}
        onChangeText={onChange}
        elevation={1}
        style={{ borderRadius: 10 }}
        placeholderTextColor={theme.colors.textSecondary}
      />
    </View>
  );
};

export default SearchBox;
