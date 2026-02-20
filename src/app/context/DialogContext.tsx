import { createContext, useContext, useState } from "react";

export type FeedbackResults = {
  correct: number;
  incorrect: number;
  incorrectIds: string[];
};

type DialogState = { type: "feedback"; data: FeedbackResults } | null;

type DialogContextType = {
  dialog: DialogState;
  openFeedbackDialog: (results: FeedbackResults) => void;
  closeDialog: () => void;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider = ({ children }: React.PropsWithChildren) => {
  const [dialog, setDialog] = useState<DialogState>(null);

  const openFeedbackDialog = (results: FeedbackResults) => {
    setDialog({ type: "feedback", data: results });
  };

  const closeDialog = () => {
    setDialog(null);
  };

  return (
    <DialogContext.Provider
      value={{
        dialog,
        openFeedbackDialog,
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
