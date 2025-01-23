import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { setProductDetails } from "@/store/shop/products-slice";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { useToast } from "@/hooks/use-toast";
import {
  addReview,
  getAllReviews,
  setReviews,
} from "@/store/shop/review-slice";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const ProductDetails = ({ open, setOpen, productDetails, handleAddToCart }) => {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const { reviews } = useSelector((state) => state.shopReviews);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleDialogClose = () => {
    setOpen(false);
    setMessage("");
    setRating(0);
    dispatch(setProductDetails());
    dispatch(setReviews());
  };

  const handleAddReview = () => {
    dispatch(
      addReview({
        productId: productDetails?._id,
        formData: { rating, message },
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        setMessage("");
        setRating(0);
      } else {
        toast({
          title: data?.payload?.message || "Failed to add review",
          variant: "destructive",
        });
      }
    });
  };

  useEffect(() => {
    if (productDetails !== null) {
      dispatch(getAllReviews(productDetails?._id));
    }
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.rating, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 gap-8 md:grid-cols-2 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] overflow-y-auto max-h-screen">
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
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <Rating
                size={25}
                readonly={true}
                allowFraction={true}
                initialValue={averageReview}
              />
            </div>
            <span className="text-muted-foreground">
              ({averageReview.toFixed(1)})
            </span>
          </div>
          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
              >
                Add to Cart
              </Button>
            )}
          </div>
          <Separator />
          <div className="mt-5 p-1 max-h-[300px] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-4">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div key={reviewItem?._id} className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {reviewItem?.user?.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">
                          {reviewItem?.user?.username}
                        </h3>
                      </div>
                      <Rating
                        size={20}
                        readonly={true}
                        allowFraction={true}
                        initialValue={reviewItem?.rating}
                      />
                      <p className="text-muted-foreground">
                        {reviewItem?.message}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Reviews</h1>
              )}
            </div>
            <div className="mt-10 flex-col flex gap-2">
              <Label>Write a review</Label>
              <Rating
                size={25}
                transition={true}
                initialValue={rating}
                onClick={(value) => setRating(value)}
              />
              <Input
                name="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Write a review..."
              />
              <Button
                onClick={handleAddReview}
                disabled={message.trim() === ""}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
