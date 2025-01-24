import ProductDetails from "@/components/shopping/product-details";
import ShoppingProductTile from "@/components/shopping/product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { addToCart } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { getSearchResults, setSearchResults } from "@/store/shop/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const SearchProducts = () => {
  const [keyword, setKeyword] = useState("");
  const [openProductDetailsDialog, setOpenProductDetailsDialog] =
    useState(false);
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { cart } = useSelector((state) => state.shopCart);
  const { toast } = useToast();
  const dispatch = useDispatch();

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
    if (productDetails !== null) {
      setOpenProductDetailsDialog(true);
    }
  }, [productDetails]);

  useEffect(() => {
    const debouncedTimeout = setTimeout(() => {
      if (keyword && keyword.trim() !== "" && keyword.trim().length > 2) {
        dispatch(getSearchResults(keyword));
      } else {
        dispatch(setSearchResults());
      }
    }, 1000);
    return () => clearTimeout(debouncedTimeout);
  }, [keyword]);

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
            className="py-6"
            placeholder="Search Products..."
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((productItem) => (
            <ShoppingProductTile
              key={productItem?._id}
              product={productItem}
              handleProductClick={handleProductClick}
              handleAddToCart={handleAddToCart}
            />
          ))
        ) : (
          <h1 className="text-2xl font-semibold">No result found!</h1>
        )}
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

export default SearchProducts;
