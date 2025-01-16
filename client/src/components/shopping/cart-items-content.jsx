import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCart } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

const UserCartItemsContent = ({ cartItem }) => {
  const { cart } = useSelector((state) => state.shopCart);
  const { products } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleCartItemDelete = () => {
    dispatch(removeFromCart(cartItem?.productId));
  };

  const handleUpdateQuantity = (type) => {
    if (type === "plus") {
      let cartItems = cart?.items || [];
      if (cartItems.length) {
        const productIndex = products.findIndex(
          (el) => el._id === cartItem?.productId
        );
        const productStock = products[productIndex].totalStock;
        const cartItemQuantity = cartItem?.quantity;
        if (cartItemQuantity + 1 > productStock) {
          toast({
            title: `Only ${cartItemQuantity} items can be added for this product`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    dispatch(
      updateCart({
        productId: cartItem?.productId,
        quantity:
          type === "plus" ? cartItem?.quantity + 1 : cartItem?.quantity - 1,
      })
    );
  };

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-bold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity("minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity("plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          ${(cartItem?.salePrice * cartItem?.quantity).toFixed(2)}
        </p>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 mt-2"
          onClick={() => handleCartItemDelete()}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default UserCartItemsContent;
