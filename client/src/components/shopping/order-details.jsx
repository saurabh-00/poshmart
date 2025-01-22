import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { DialogContent } from "../ui/dialog";

const ShoppingOrderDetailsView = ({ orderDetails }) => {
  return (
    <DialogContent className="sm:max-w-[600px] overflow-y-scroll max-h-screen">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Amount</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between capitalize">
            <p className="font-medium">Payment Method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between capitalize">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between capitalize">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 capitalize ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "cancelled"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.items && orderDetails?.items.length > 0
                ? orderDetails?.items.map((item) => (
                    <li
                      key={item?.product?._id}
                      className="flex items-center justify-between"
                    >
                      <span>Title: {item?.product?.title}</span>
                      <span>Quantity: {item?.quantity}</span>
                      <span>Price: ${item?.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{orderDetails?.address?.address}</span>
              <span>{orderDetails?.address?.city}</span>
              <span>{orderDetails?.address?.pincode}</span>
              <span>{orderDetails?.address?.phone}</span>
              <span>{orderDetails?.address?.notes}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default ShoppingOrderDetailsView;
