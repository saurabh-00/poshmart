import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Dialog } from "../ui/dialog";
import { Button } from "../ui/button";
import {
  getAllUserOrders,
  getOrderDetails,
  setOrderDetails,
} from "@/store/shop/orders-slice";
import ShoppingOrderDetailsView from "./order-details";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";

const ShoppingOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { orders, orderDetails } = useSelector((state) => state.shopOrders);

  const fetchOrderDetails = (orderId) => {
    dispatch(getOrderDetails(orderId));
  };

  useEffect(() => {
    dispatch(getAllUserOrders());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders && orders.length > 0
              ? orders.map((order) => (
                  <TableRow key={order?._id}>
                    <TableCell>{order?._id}</TableCell>
                    <TableCell>{order?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 capitalize ${
                          order?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : order?.orderStatus === "cancelled"
                            ? "bg-red-500"
                            : "bg-black"
                        }`}
                      >
                        {order?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>${order?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(setOrderDetails());
                        }}
                      >
                        <Button onClick={() => fetchOrderDetails(order?._id)}>
                          View Details
                        </Button>
                        <ShoppingOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShoppingOrders;
