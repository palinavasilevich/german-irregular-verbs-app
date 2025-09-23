import { VerbsListLayoutHeader } from "@/features/verbs-list/ui/layout/verbs-list-header";
import { VerbsListLayout } from "@/features/verbs-list/ui/layout/verbs-list-layout";

export function PracticeVerbs() {
  return (
    <VerbsListLayout
      header={<VerbsListLayoutHeader title="Irregular German Verbs" />}
    >
      <div></div>
    </VerbsListLayout>
  );
}
