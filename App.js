import { NativeRouter } from "react-router-native";
import Main from "./src/components/main";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <>
      <NativeRouter>
        <Main />
      </NativeRouter>
      <StatusBar style="light" />
    </>
  );
}
