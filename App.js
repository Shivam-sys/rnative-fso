import { NativeRouter } from "react-router-native";
import Main from "./src/components/main";
import { StatusBar } from "expo-status-bar";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "./src/utils/apolloClient";

export default function App() {
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={createApolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="light" />
    </>
  );
}
