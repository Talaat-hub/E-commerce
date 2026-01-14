import ProductCard from "@/components/products/ProductCard/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  getAllProducts,
  getAllCategories,
} from "@/lib/actions/product.actions";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Rating from "@/components/products/Rating/Rating";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const prices = [
  { name: "€25 to €50", value: "25-50" },
  { name: "€51 to €75", value: "51-75" },
  { name: "€76 to €100", value: "76-100" },
  { name: "€101 to €125", value: "125-150" },
  { name: "€151 to €200", value: "151-200" },
];

const ratings = [4, 3, 2, 1];
const sortOrders = ["newest", "lowest", "highest", "rating"];

const SearchPage = async (props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}) => {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await props.searchParams;

  const getFilterUrl = ({
    c,
    p,
    r,
    s,
    pg,
  }: {
    c?: string;
    p?: string;
    r?: string;
    s?: string;
    pg?: string;
  }) => {
    const params = { q, category, price, rating, sort, page };

    if (c) params.category = c;
    if (p) params.price = p;
    if (r) params.rating = r;
    if (s) params.sort = s;
    if (pg) params.page = pg;

    return `/search?${new URLSearchParams(params).toString()}`;
  };

  const products = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    sort,
    page: Number(page),
  });

  const categories = await getAllCategories();

  return (
    <div className="grid md:grid-cols-5 gap-6">
      {/* ================= FILTER SIDEBAR ================= */}
      <Card className="h-fit rounded-2xl bg-card  md:w-40 lg:w-auto">
        <CardContent className="p-5 space-y-6">
          <h2 className="text-2xl font-bold">Filters</h2>

          {/* Department */}
          <div>
            <p className="font-semibold mb-3">Department</p>
            <div className="space-y-2">
              {["all", ...categories.map((c) => c.category)].map((c) => {
                const active =
                  category === c || (c === "all" && category === "all");

                return (
                  <Link
                    key={c}
                    href={getFilterUrl({ c })}
                    className="flex items-center gap-2 text-sm"
                  >
                    <Checkbox checked={active} />
                    <span className={active ? "font-semibold" : ""}>
                      {c === "all" ? "Any" : c}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Price */}
          <div>
            <p className="font-semibold mb-3">Price</p>
            <div className="space-y-2">
              {["all", ...prices.map((p) => p.value)].map((p) => {
                const active = price === p || (p === "all" && price === "all");

                return (
                  <Link
                    key={p}
                    href={getFilterUrl({ p })}
                    className="flex items-center gap-2 text-sm"
                  >
                    <Checkbox checked={active} />
                    <span className={active ? "font-semibold" : ""}>
                      {p === "all"
                        ? "Any"
                        : prices.find((x) => x.value === p)?.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Ratings */}
          <div>
            <p className="font-semibold mb-3">Ratings</p>
            <div className="space-y-2">
              {["all", ...ratings.map(String)].map((r) => {
                const active =
                  rating === r || (r === "all" && rating === "all");

                return (
                  <Link
                    key={r}
                    href={getFilterUrl({ r })}
                    className="flex items-center gap-2 text-sm"
                  >
                    <Checkbox checked={active} />
                    <span className={active ? "font-semibold" : ""}>
                      {r === "all" ? (
                        <Rating value={5} />
                      ) : (
                        <Rating value={Number(r)} />
                      )}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================= MAIN CONTENT ================= */}
      <div className="md:col-span-4 space-y-5">
        {/* FILTER BAR */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Active filters */}
          <div className="flex flex-wrap gap-2">
            {category !== "all" && (
              <Badge variant="secondary">Category: {category}</Badge>
            )}
            {price !== "all" && (
              <Badge variant="secondary">Price: {price}</Badge>
            )}
            {rating !== "all" && (
              <Badge variant="secondary">{rating}+ stars</Badge>
            )}

            {(category !== "all" || price !== "all" || rating !== "all") && (
              <Button variant="link" asChild className="px-0 h-auto">
                <Link href="/search">Clear all</Link>
              </Button>
            )}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Sort by:</span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-40 justify-between">
                  {sort.charAt(0).toUpperCase() + sort.slice(1)}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-40">
                {sortOrders.map((s) => (
                  <DropdownMenuItem key={s} asChild>
                    <Link
                      href={getFilterUrl({ s })}
                      className={`w-full ${
                        sort === s ? "font-semibold text-primary" : ""
                      }`}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
          {products.data.length === 0 && (
            <div className="text-muted-foreground">No products found</div>
          )}
          {products.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
