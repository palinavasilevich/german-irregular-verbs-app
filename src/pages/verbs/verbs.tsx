import { VerbsTable } from "@/features/verbs-list/ui/verbs-table";
import { PageContent } from "@/shared/components/layout/page-content";
import { useGetAllVerbsQuery } from "@/entities/verb/api/useVerbsQuery";

function VerbsPage() {
  const { verbs } = useGetAllVerbsQuery();

  return (
    <PageContent title="Irregular German Verbs">
      <VerbsTable data={verbs} />
    </PageContent>
  );
}

export const Component = VerbsPage;
