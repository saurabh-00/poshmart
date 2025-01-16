import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { setProductDetails } from "@/store/shop/products-slice";
import { useDispatch } from "react-redux";

const ProductDetails = ({ open, setOpen, productDetails }) => {
  const dispatch = useDispatch();

  const handleDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails());
  };
  
  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 gap-8 md:grid-cols-2 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div>
          <div>
            <h1 className="text-3xl font-bold">{productDetails?.title}</h1>
            <div className="flex justify-between items-center mt-1">
              <span className="text-lg text-muted-foreground">
                {categoryOptionsMap[productDetails?.category]}
              </span>
              <span className="text-lg text-muted-foreground">
                {brandOptionsMap[productDetails?.brand]}
              </span>
            </div>
            <p className="text-muted-foreground text-xl mb-5 mt-2">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <span
              className={`${
                productDetails?.salePrice !== productDetails?.price
                  ? "line-through"
                  : ""
              } text-2xl font-bold text-primary`}
            >
              ${productDetails?.price}
            </span>
            {productDetails?.salePrice !== productDetails?.price ? (
              <span className="text-2xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </span>
            ) : null}
          </div>
          {/* Reviews Stars */}
          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button className="w-full">Add to Cart</Button>
            )}
          </div>
          <Separator />
          {/* Users Reviews with write review and stars */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
