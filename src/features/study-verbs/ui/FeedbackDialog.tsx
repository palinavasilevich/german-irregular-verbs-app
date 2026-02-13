import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/ui/kit/alert-dialog";

import { useDialogContext } from "@/app/context/DialogContext";
import { Button } from "@/shared/ui/kit/button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/app/router/routes";
import { HomeIcon, RepeatIcon, X as CrossIcon } from "lucide-react";

type FeedbackDialogProps = {
  onLearnVerbsAgain: () => void;
  onRepeatIncorrect: () => void;
  onClose: () => void;
};

export function FeedbackDialog({
  onLearnVerbsAgain,
  onRepeatIncorrect,
  onClose,
}: FeedbackDialogProps) {
  const navigate = useNavigate();
  const { currentDialog, feedbackResults, closeDialog } = useDialogContext();

  const handleOpenAllVerbsPage = () => {
    navigate(ROUTES.VERBS);
    closeDialog();
  };

  if (currentDialog !== "feedback" || !feedbackResults) return null;

  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <Button
            className="w-8 h-8 p-0 absolute right-3 top-2 cursor-pointer"
            variant="ghost"
            onClick={onClose}
          >
            <CrossIcon className="h-4 w-4" />
          </Button>

          <AlertDialogTitle className="text-2xl text-center">
            🎉 Gut gemacht!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Du hast alle Verben ausgefüllt.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col items-center gap-3 text-lg mt-4">
          <p>✅ Richtige Antworten: {feedbackResults.correct}</p>
          <p>❌ Falsche Antworten: {feedbackResults.incorrect}</p>
        </div>

        <AlertDialogFooter className="flex sm:flex-col sm:justify-center mt-4 gap-2">
          {feedbackResults.incorrect > 0 && (
            <Button className="cursor-pointer" onClick={onRepeatIncorrect}>
              Repeat only incorrect verbs
            </Button>
          )}
          <AlertDialogAction
            className="cursor-pointer"
            onClick={onLearnVerbsAgain}
          >
            <RepeatIcon />
            Learn verbs again
          </AlertDialogAction>

          <AlertDialogAction
            className="cursor-pointer"
            onClick={handleOpenAllVerbsPage}
          >
            <HomeIcon />
            All verbs
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
