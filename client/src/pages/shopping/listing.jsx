import ProductFilter from "@/components/shopping/filter";
import ShoppingProductTile from "@/components/shopping/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ShoppingListing = () => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.shopProducts);

  const handleSort = (value) => {
    setSort(value);
  };

  const handleFilters = (mainFilter, subFilter) => {
    setFilters((oldFilters) => {
      let updatedFilters;
      // Check if the main filter key exists in the current filters
      const isMainFilterPresent = oldFilters.hasOwnProperty(mainFilter);
      if (!isMainFilterPresent) {
        // If the main filter key doesn't exist, add it with the subFilter
        updatedFilters = {
          ...oldFilters,
          [mainFilter]: [subFilter],
        };
      } else {
        const isSubFilterPresent = oldFilters[mainFilter].includes(subFilter);
        if (isSubFilterPresent) {
          // Remove the subFilter if it already exists
          updatedFilters = {
            ...oldFilters,
            [mainFilter]: oldFilters[mainFilter].filter(
              (option) => option !== subFilter
            ),
          };
        } else {
          // Add the subFilter if it doesn't exist
          updatedFilters = {
            ...oldFilters,
            [mainFilter]: [...oldFilters[mainFilter], subFilter],
          };
        }
      }

      // Remove the main filter key if it becomes empty
      if (
        updatedFilters[mainFilter] &&
        updatedFilters[mainFilter].length === 0
      ) {
        const { [mainFilter]: _, ...restFilters } = updatedFilters;
        updatedFilters = restFilters;
      }

      sessionStorage.setItem("filters", JSON.stringify(updatedFilters));
      return updatedFilters;
    });
  };

  useEffect(() => {
    setSort(sortOptions[0].id);
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilters={handleFilters} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-bold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {products?.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 h-7"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      key={sortItem.id}
                      value={sortItem.id}
                      className="cursor-pointer"
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
          {!!products.length &&
            products.map((productItem) => (
              <ShoppingProductTile
                key={productItem?._id}
                product={productItem}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ShoppingListing;
