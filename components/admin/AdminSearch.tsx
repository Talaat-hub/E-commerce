"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";

const AdminSearch = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const formActionUrl = pathname.includes("/admin/orders")
    ? "/admin/orders"
    : pathname.includes("/admin/users")
      ? "/admin/users"
      : "/admin/products";

  const queryValue = searchParams.get("query") || "";

  return (
    <form action={formActionUrl} method="GET" className="hidden md:block">
      <Input
        type="search"
        placeholder="Search..."
        name="query"
        defaultValue={queryValue}
        className="md:w-25 lg:w-75"
      />
      <button className="sr-only" type="submit">
        Search
      </button>
    </form>
  );
};

export default AdminSearch;
