import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {

  const page = parseInt(searchParams.page)
  return (
    <>
      <div>
        <h1>Home</h1>
        <Suspense fallback={"...loading"}>
          <Table currentPage={page}></Table>
        </Suspense>
    
      </div>
    </>
  );
}
