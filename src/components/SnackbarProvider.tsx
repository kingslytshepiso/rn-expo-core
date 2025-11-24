import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Portal, Snackbar } from "react-native-paper";

export interface SnackbarOptions {
  /**
   * Message to display inside the snackbar.
   */
  message: string;
  /**
   * Optional label for an action button.
   */
  actionLabel?: string;
  /**
   * Duration in milliseconds before automatically dismissing.
   * Defaults to 3000ms.
   */
  duration?: number;
  /**
   * Optional callback when the action button is pressed.
   */
  onActionPress?: () => void;
}

interface SnackbarState extends SnackbarOptions {
  visible: boolean;
}

export interface SnackbarContextValue {
  /**
   * Display a snackbar with the provided options.
   */
  showSnackbar: (options: SnackbarOptions) => void;
  /**
   * Dismiss the currently visible snackbar.
   */
  hideSnackbar: () => void;
  /**
   * Whether a snackbar is currently visible.
   */
  isVisible: boolean;
  /**
   * Snapshot of the current snackbar options.
   */
  currentSnackbar?: SnackbarOptions;
}

const SnackbarContext = createContext<SnackbarContextValue | undefined>(
  undefined,
);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    message: "",
    visible: false,
  });

  const hideSnackbar = useCallback(() => {
    setSnackbarState((prev) => ({
      ...prev,
      visible: false,
    }));
  }, []);

  const showSnackbar = useCallback((options: SnackbarOptions) => {
    setSnackbarState({
      visible: true,
      message: options.message,
      actionLabel: options.actionLabel,
      duration: options.duration,
      onActionPress: options.onActionPress,
    });
  }, []);

  const handleActionPress = useCallback(() => {
    snackbarState.onActionPress?.();
    hideSnackbar();
  }, [snackbarState, hideSnackbar]);

  const contextValue = useMemo<SnackbarContextValue>(
    () => ({
      showSnackbar,
      hideSnackbar,
      isVisible: snackbarState.visible,
      currentSnackbar: snackbarState.visible
        ? {
            message: snackbarState.message,
            actionLabel: snackbarState.actionLabel,
            duration: snackbarState.duration,
            onActionPress: snackbarState.onActionPress,
          }
        : undefined,
    }),
    [hideSnackbar, showSnackbar, snackbarState],
  );

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <Portal>
        <Snackbar
          visible={snackbarState.visible}
          onDismiss={hideSnackbar}
          duration={snackbarState.duration ?? 3000}
          action={
            snackbarState.actionLabel
              ? {
                  label: snackbarState.actionLabel,
                  onPress: handleActionPress,
                }
              : undefined
          }
        >
          {snackbarState.message}
        </Snackbar>
      </Portal>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextValue => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error(
      "useSnackbar must be used within a SnackbarProvider. Wrap your component tree with SnackbarProvider or AppProviders.",
    );
  }
  return context;
};
