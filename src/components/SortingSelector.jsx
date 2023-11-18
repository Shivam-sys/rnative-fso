import { View } from "react-native";
import useMenuVars from "../hooks/useMenuVars";
import { selectionOptions } from "../utils";
import { Menu, Button } from "react-native-paper";

const SortingSelector = ({ setSortValues, buttonText }) => {
  const { menuVisible, showMenu, hideMenu } = useMenuVars();
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginBottom: 8,
      }}
    >
      <Menu
        visible={menuVisible}
        onDismiss={hideMenu}
        anchor={
          <Button
            onPress={showMenu}
            contentStyle={{ flexDirection: "row-reverse" }}
            style={{
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "grey",
            }}
            icon="chevron-down"
          >
            {buttonText}
          </Button>
        }
      >
        {selectionOptions.map((option) => (
          <Menu.Item
            key={option.title}
            onPress={() => {
              setSortValues(option);
              hideMenu();
            }}
            title={option.title}
            disabled={buttonText === option.title}
          />
        ))}
      </Menu>
    </View>
  );
};

export default SortingSelector;
