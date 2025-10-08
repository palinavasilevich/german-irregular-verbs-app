import { useGetAllVerbsQuery } from "@/entities/verb/api/use-verbs-query";
import { useVerbsTableColumns } from "@/entities/verb/model/use-verbs-table-columns";

import { AllVerbsTable } from "@/features/select-verbs/ui/all-verbs-table";
import { PageContent } from "@/shared/components/layout/page-content";
import { Loader } from "@/shared/ui/loader/loader";

function AllVerbsPage() {
  const { verbs, isPending } = useGetAllVerbsQuery();
  const columns = useVerbsTableColumns({
    withSelection: true,
    withSorting: true,
  });

  let content;

  if (isPending) {
    content = <Loader />;
  } else {
    content = <AllVerbsTable data={verbs} columns={columns} />;
  }

  return <PageContent title="Irregular German Verbs">{content}</PageContent>;
}

export const Component = AllVerbsPage;
