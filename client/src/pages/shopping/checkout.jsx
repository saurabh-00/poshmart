import Address from "@/components/shopping/address";
import UserCartItemsContent from "@/components/shopping/cart-items-content";
import { Button } from "@/components/ui/button";
import { sortOptions } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { createNewOrder } from "@/store/shop/orders-slice";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ShoppingCheckout = () => {
  const { cart } = useSelector((state) => state.shopCart);
  const { approvalURL } = useSelector((state) => state.shopOrders);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const cartItems = cart?.items;

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum + currentItem?.salePrice * currentItem?.quantity,
          0
        )
      : 0;

  const handleInitiatePaypalPayment = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return;
    }

    if (selectedAddress === null) {
      toast({
        title: "Please choose an address to proceed",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      cartItems: cartItems.map((cartItem) => ({
        productId: cartItem?.productId,
        title: cartItem?.title,
        price: cartItem?.salePrice,
        quantity: cartItem?.quantity,
      })),
      addressId: selectedAddress?._id,
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    };
    
    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        sessionStorage.setItem("orderId", data?.payload?.orderId);
        setIsPaymemntStart(true);
      } else {
        setIsPaymemntStart(false);
      }
    });
  };

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: sortOptions[0].id,
      })
    );
  }, [dispatch]);

  return (
    <div className="flex flex-col lg:flex-row gap-5 mt-5 p-5">
      <Address
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
      />
      <div className="flex flex-col gap-4 w-full lg:max-w-xs xl:max-w-md 2xl:max-w-lg">
        {cartItems && cartItems.length > 0 ? (
          <Fragment>
            {cartItems.map((item) => (
              <UserCartItemsContent key={item?.productId} cartItem={item} />
            ))}
            <div className="mt-8 space-y-4">
              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold">${totalCartAmount}</span>
              </div>
            </div>
            <div className="mt-4">
              <Button
                onClick={() => handleInitiatePaypalPayment()}
                className="w-full"
              >
                {isPaymentStart
                  ? "Processing Paypal Payment..."
                  : "Checkout with Paypal"}
              </Button>
            </div>
          </Fragment>
        ) : (
          <h3 className="font-semibold">Your cart is empty!</h3>
        )}
      </div>
    </div>
  );
};

export default ShoppingCheckout;
