import { useLocation } from "react-router-dom";
import { useGetVerbsByIdsQuery } from "@/entities/verb/api/use-verbs-query";
import { useVerbsTableColumns } from "@/entities/verb/ui/verbs-table/use-verbs-table-columns";

import { VerbsTable } from "@/entities/verb/ui/verbs-table/verbs-table";
import { PageContent } from "@/shared/components/layout/page-content";

export function StudyVerbsPage() {
  const location = useLocation();

  const verbsIdsParam = new URLSearchParams(location.search).get("ids") || "";
  const verbsIds = verbsIdsParam.split(",");

  const { data: verbs, isPending } = useGetVerbsByIdsQuery(verbsIds);
  const columns = useVerbsTableColumns({ withSelection: false });

  return (
    <PageContent title="Study Verbs">
      {isPending && <div>Loading...</div>}
      {!isPending && verbs?.length && (
        <VerbsTable data={verbs} columns={columns} />
      )}
    </PageContent>
  );
}

export const Component = StudyVerbsPage;
