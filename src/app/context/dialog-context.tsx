import { createContext, useContext, useState } from "react";

type DialogType = "feedback";

type FeedbackResults = { correct: number; incorrect: number };

type DialogContextType = {
  currentDialog: DialogType | null;
  feedbackResults: FeedbackResults | null;
  openDialog: (type: DialogType, results?: FeedbackResults) => void;
  closeDialog: () => void;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider = ({ children }: React.PropsWithChildren) => {
  const [currentDialog, setCurrentDialog] = useState<DialogType | null>(null);
  const [feedbackResults, setFeedbackResults] =
    useState<FeedbackResults | null>(null);

  const openDialog = ((type: DialogType, results: FeedbackResults) => {
    setCurrentDialog(type);
    if (type === "feedback" && results) {
      setFeedbackResults(results);
    }
  }) as DialogContextType["openDialog"];

  const closeDialog = () => {
    setCurrentDialog(null);
    setFeedbackResults(null);
  };

  return (
    <DialogContext.Provider
      value={{
        currentDialog,
        feedbackResults,
        openDialog,
        closeDialog,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
