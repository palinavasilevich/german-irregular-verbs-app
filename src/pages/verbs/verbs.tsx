import { useVerbsList } from "@/features/verbs-list/api/use-verbs-list";
import { columns } from "@/features/verbs-list/ui/table/columns";
import { VerbsListLayoutHeader } from "@/features/verbs-list/ui/layout/verbs-list-header";
import { VerbsListLayout } from "@/features/verbs-list/ui/layout/verbs-list-layout";
import { VerbsTable } from "@/features/verbs-list/ui/table/verbs-table";

function VerbsPage() {
  const verbsQuery = useVerbsList({});

  return (
    <VerbsListLayout
      header={<VerbsListLayoutHeader title="Irregular German Verbs" />}
    >
      <VerbsTable columns={columns} data={verbsQuery.verbs} />
    </VerbsListLayout>
  );
}

export const Component = VerbsPage;
