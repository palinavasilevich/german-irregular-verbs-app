import { useNavigate, createSearchParams } from "react-router-dom";
import { useVerbStore } from "@/entities/verb/model/store";
import { Button } from "@/shared/ui/kit/button";
import { RocketIcon } from "lucide-react";

export function StudyVerbsButton() {
  const navigate = useNavigate();
  const { selectedVerbsIds, clearSelectedVerbsIds } = useVerbStore();

  const handleClick = () => {
    if (selectedVerbsIds.length === 0) return;

    const params = createSearchParams({ ids: selectedVerbsIds.join(",") });
    clearSelectedVerbsIds();
    navigate(`/study-verbs?${params.toString()}`);
  };

  const countSelectedVerbsIds = selectedVerbsIds.length;

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      disabled={countSelectedVerbsIds === 0}
      className="cursor-pointer"
    >
      <RocketIcon className="mr-2 size-4" aria-hidden="true" />
      {`Study (${countSelectedVerbsIds}) ${
        countSelectedVerbsIds === 1 ? "verb" : "verbs"
      }`}
    </Button>
  );
}
