import { useVerbsList } from "@/features/verbs-list/api/use-verbs-list";
import { verbsTableColumns } from "@/features/verbs-list/ui/table/verbs-table-columns";
import { VerbsListLayoutHeader } from "@/features/verbs-list/ui/layout/verbs-list-header";
import { VerbsListLayout } from "@/features/verbs-list/ui/layout/verbs-list-layout";
import { VerbsTable } from "@/features/verbs-list/ui/table/verbs-table";

function VerbsPage() {
  const verbsQuery = useVerbsList({});

  return (
    <VerbsListLayout
      header={<VerbsListLayoutHeader title="Irregular German Verbs" />}
    >
      <VerbsTable columns={verbsTableColumns} data={verbsQuery.verbs} />
    </VerbsListLayout>
  );
}

export const Component = VerbsPage;
