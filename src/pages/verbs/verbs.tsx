import { useVerbsList } from "@/features/verbs-list/api/use-verbs-list";
import { verbsTableColumns } from "@/features/verbs-list/ui/table/verbs-table-columns";
import { VerbsTable } from "@/features/verbs-list/ui/table/verbs-table";
import { PageContent } from "@/shared/components/layout/page-content";

function VerbsPage() {
  const verbsQuery = useVerbsList({});

  return (
    <PageContent title="Irregular German Verbs">
      <VerbsTable columns={verbsTableColumns} data={verbsQuery.verbs} />
    </PageContent>
  );
}

export const Component = VerbsPage;
