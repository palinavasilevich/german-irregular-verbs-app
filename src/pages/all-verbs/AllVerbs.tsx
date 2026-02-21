import { PageContent } from "@/app/layout/PageContent";
import { useGetAllVerbsQuery } from "@/entities/verb/api/useVerbsQuery";
import { useVerbsTableColumns } from "@/entities/verb/model/useVerbsTableColumns";

import { AllVerbsTable } from "@/features/select-verbs/ui/AllVerbsTable";

import { Loader } from "@/shared/ui/loader/loader";

function AllVerbsPage() {
  const { verbs, isPending } = useGetAllVerbsQuery();
  const columns = useVerbsTableColumns({
    withSelection: true,
    withSorting: true,
  });

  if (isPending) {
    return <Loader />;
  }

  return (
    <PageContent title="Irregular German Verbs">
      <AllVerbsTable data={verbs} columns={columns} />
    </PageContent>
  );
}

export const Component = AllVerbsPage;
