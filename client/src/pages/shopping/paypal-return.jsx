import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/orders-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const PaypalReturn = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");
  const orderId = sessionStorage.getItem("orderId");

  useEffect(() => {
    if (paymentId && payerId && orderId) {
      dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("orderId");
          window.location.href = "/shop/payment-success";
        }
      });
    }
  }, [dispatch, paymentId, payerId, orderId]);

  return (
    <Card className="p-10 flex flex-col justify-center items-center">
      <CardHeader className="p-0">
        <CardTitle className="flex flex-col items-center gap-2">
          <span className="text-4xl text-red-500">Please Wait!</span>
          <span className="text-2xl">Processing Payment...</span>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default PaypalReturn;
