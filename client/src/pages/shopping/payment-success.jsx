import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <Card className="p-10 flex flex-col justify-center items-center">
      <CardHeader className="p-0">
        <CardTitle className="flex items-center gap-2 text-4xl">
          <span>Payment Successful</span>
          <CircleCheck className="font-extrabold w-8 h-8 text-green-500" />
        </CardTitle>
      </CardHeader>
      <Button className="mt-5" onClick={() => navigate("/shop/account")}>
        View Orders
      </Button>
    </Card>
  );
};

export default PaymentSuccess;
