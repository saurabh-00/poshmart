import ProductDetails from "@/components/shopping/product-details";
import ShoppingProductTile from "@/components/shopping/product-tile";
import { Card, CardContent } from "@/components/ui/card";
import { filterOptions, sortOptions } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addToCart } from "@/store/shop/cart-slice";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const categories = filterOptions.category;

const brands = filterOptions.brand;

const ShoppingHome = () => {
  const [openProductDetailsDialog, setOpenProductDetailsDialog] =
    useState(false);
  const { products, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { cart } = useSelector((state) => state.shopCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNavigateToListingPage = (filterItem, filterOption) => {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [filterOption]: [filterItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
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
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: sortOptions[0].id,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (productDetails !== null) {
      setOpenProductDetailsDialog(true);
    }
  }, [productDetails]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {/* Feature Image */}
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Card
                key={`${category.id}_category`}
                onClick={() =>
                  handleNavigateToListingPage(category, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <category.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{category.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brands.map((brand) => (
              <Card
                key={`${brand.id}_brand`}
                onClick={() => handleNavigateToListingPage(brand, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brand.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brand.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {products && products.length > 0
              ? products.map((productItem) => (
                  <ShoppingProductTile
                    key={productItem?._id}
                    product={productItem}
                    handleProductClick={handleProductClick}
                    handleAddToCart={handleAddToCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetails
        open={openProductDetailsDialog}
        setOpen={setOpenProductDetailsDialog}
        productDetails={productDetails}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ShoppingHome;
