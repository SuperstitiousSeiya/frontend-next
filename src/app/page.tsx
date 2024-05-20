
import dynamic from "next/dynamic";
import { Suspense } from "react";
const TableComponent = dynamic(() => import('@/components/Table'), {
  ssr: false,loading: () => <>Loading</>,
})

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const response = await fetch(
    `http://localhost:3000/?page=${searchParams.page}`
  );
  const data = await response.json();
  const currentPage = (searchParams.page as string) || "1";
  const tableData = data.data;
  const totalPages = data.totalPages;

  return (
    <>
      <Suspense fallback={<>Loading</>}>
        <TableComponent
          currentPage={currentPage}
          totalPages={totalPages}
          data={tableData}
        ></TableComponent>
      </Suspense>
    </>
  );
}
