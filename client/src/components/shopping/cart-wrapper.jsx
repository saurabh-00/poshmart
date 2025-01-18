import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { Fragment } from "react";

const UserCartWrapper = ({ cartItems, setOpenCartSheet }) => {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum + currentItem?.salePrice * currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="w-full">
      <SheetHeader>
        <SheetTitle>
          <h1 className="text-xl font-bold">Your Cart</h1>
        </SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item, i) => (
            <Fragment key={item?.productId || `${item?.title}_${i}`}>
              <UserCartItemsContent cartItem={item} />
              <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">${totalCartAmount}</span>
                </div>
              </div>
              <Button
                onClick={() => {
                  navigate("/shop/checkout");
                  setOpenCartSheet(false);
                }}
                className="w-full mt-6"
              >
                Checkout
              </Button>
            </Fragment>
          ))
        ) : (
          <h3 className="font-semibold">Your cart is empty!</h3>
        )}
      </div>
    </SheetContent>
  );
};

export default UserCartWrapper;
