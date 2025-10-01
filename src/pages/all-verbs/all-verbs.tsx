import { useGetAllVerbsQuery } from "@/entities/verb/api/use-verbs-query";
import { useVerbsTableColumns } from "@/entities/verb/ui/verbs-table/use-verbs-table-columns";

import { AllVerbsTable } from "@/features/select-verbs/ui/all-verbs-table";
import { PageContent } from "@/shared/components/layout/page-content";

function AllVerbsPage() {
  const { verbs, isPending } = useGetAllVerbsQuery();
  const columns = useVerbsTableColumns({
    withSelection: true,
    withSorting: true,
  });

  return (
    <PageContent title="Irregular German Verbs">
      {isPending && <div>Loading...</div>}
      {!isPending && <AllVerbsTable data={verbs} columns={columns} />}
    </PageContent>
  );
}

export const Component = AllVerbsPage;
