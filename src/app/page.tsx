import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import Link from "next/link";
import { Suspense } from "react";
export const dynamic = "force-dynamic";
import { v4 as uuid} from 'uuid';
export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = parseInt(searchParams.page);

  return (
    <div key={uuid()}>
      <h1>Home</h1>
      <Link
        href={{
          pathname: "/",
          query: { page: page > 1 ? page + 1 : 1 },
        }}
      >
        Next
      </Link>
      <Suspense fallback={"...loading"}>
        <Table currentPage={page}></Table>
      </Suspense>
    </div>
  );
}
