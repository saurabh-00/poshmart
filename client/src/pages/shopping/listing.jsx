import ProductFilter from "@/components/shopping/filter";
import ProductDetails from "@/components/shopping/product-details";
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
import { useToast } from "@/hooks/use-toast";
import { addToCart } from "@/store/shop/cart-slice";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const createSearchParamsString = (filters = {}) => {
  let queryParams = [];
  for (const [key, value] of Object.entries(filters)) {
    if (Array.isArray(value) && value.length > 0) {
      queryParams.push(`${key}=${encodeURIComponent(value.join(","))}`);
    }
  }
  return queryParams.join("&");
};

const ShoppingListing = () => {
  const [filters, setFilters] = useState(
    JSON.parse(sessionStorage.getItem("filters")) || {}
  );
  const [sort, setSort] = useState(sortOptions[0].id);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openProductDetailsDialog, setOpenProductDetailsDialog] =
    useState(false);
  const dispatch = useDispatch();
  const { products, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { cart } = useSelector((state) => state.shopCart);
  const { toast } = useToast();

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

  const handleProductClick = (productId) => {
    dispatch(fetchProductDetails(productId));
  };

  const handleAddToCart = (productId, productStock) => {
    let cartItems = cart?.items || [];
    if (cartItems.length) {
      const itemIndex = cartItems.findIndex(
        (el) => el?.productId === productId
      );
      if (itemIndex !== -1) {
        const cartItemQuantity = cartItems[itemIndex].quantity;
        if (cartItemQuantity + 1 > productStock) {
          toast({
            title: `Only ${cartItemQuantity} items can be added for this product`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    dispatch(addToCart({ productId: productId, quantity: 1 }))
      .then((data) => {
        if (data?.payload?.success) {
          toast({
            title: data?.payload?.message,
          });
        } else {
          throw new Error("Failed to add product to cart");
        }
      })
      .catch((e) => {
        toast({
          title: e?.response?.data?.message || "Failed to add product to cart",
          variant: "destructive",
        });
      });
  };

  useEffect(() => {
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [searchParams]);

  useEffect(() => {
    const queryString = createSearchParamsString(filters);
    setSearchParams(new URLSearchParams(queryString));
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
    }
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (productDetails !== null) {
      setOpenProductDetailsDialog(true);
    }
  }, [productDetails]);

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
                handleProductClick={handleProductClick}
                handleAddToCart={handleAddToCart}
              />
            ))}
        </div>
      </div>
      <ProductDetails
        open={openProductDetailsDialog}
        setOpen={setOpenProductDetailsDialog}
        productDetails={productDetails}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ShoppingListing;
