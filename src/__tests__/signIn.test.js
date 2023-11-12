import {
  act,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { SignInContainer } from "../components/SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn();
      render(<SignInContainer onSubmit={onSubmit} />);

      await act(async () => {
        fireEvent.changeText(screen.getByPlaceholderText("Username"), "kalle");
        fireEvent.changeText(
          screen.getByPlaceholderText("Password"),
          "password"
        );
      });

      fireEvent.press(screen.getByTestId("signInButton"));
      // fireEvent.press(screen.getByText("Sign In"));
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            username: "kalle",
            password: "password",
          }),
          expect.any(Object)
        );
        // onSubmit.mock.calls[0][0] contains the first argument of the first call
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
        });
      });
    });
  });
});
