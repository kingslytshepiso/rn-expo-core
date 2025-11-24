import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { Text, TouchableOpacity } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SnackbarProvider, useSnackbar } from "../SnackbarProvider";
import { lightTheme } from "../../theme";

const TestButtons: React.FC = () => {
  const { showSnackbar, hideSnackbar, isVisible } = useSnackbar();

  return (
    <>
      <TouchableOpacity onPress={() => showSnackbar({ message: "Hello" })}>
        <Text>Show</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={hideSnackbar}>
        <Text>Hide</Text>
      </TouchableOpacity>
      <Text testID="visibility">{isVisible ? "visible" : "hidden"}</Text>
    </>
  );
};

const renderWithProviders = () =>
  render(
    <PaperProvider theme={lightTheme}>
      <SnackbarProvider>
        <TestButtons />
      </SnackbarProvider>
    </PaperProvider>,
  );

describe("SnackbarProvider", () => {
  it("shows snackbar message when showSnackbar is called", () => {
    const { getByText, queryByText, getByTestId } = renderWithProviders();

    expect(queryByText("Hello")).toBeNull();
    expect(getByTestId("visibility").props.children).toBe("hidden");

    fireEvent.press(getByText("Show"));

    expect(getByText("Hello")).toBeTruthy();
    expect(getByTestId("visibility").props.children).toBe("visible");
  });

  it("hides snackbar when hideSnackbar is called", async () => {
    const { getByText, getByTestId } = renderWithProviders();

    fireEvent.press(getByText("Show"));
    expect(getByText("Hello")).toBeTruthy();

    fireEvent.press(getByText("Hide"));
    await waitFor(() =>
      expect(getByTestId("visibility").props.children).toBe("hidden"),
    );
  });

  it("throws when useSnackbar is used outside provider", () => {
    const originalError = console.error;
    console.error = jest.fn();

    const FaultyComponent = () => {
      useSnackbar();
      return null;
    };

    try {
      expect(() => render(<FaultyComponent />)).toThrow(
        /useSnackbar must be used within a SnackbarProvider/i,
      );
    } finally {
      console.error = originalError;
    }
  });
});
