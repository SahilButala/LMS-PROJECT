import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CaptureFinalizePaymentService } from "@/services/api-services";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Payment_ReturnPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");
  console.log("---pay--", params);

  useEffect(() => {
    if (payerId && paymentId) {
      async function capturePayment() {
        const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

        const res = await CaptureFinalizePaymentService(
          paymentId,
          payerId,
          orderId
        );

        if(res.success){
            sessionStorage.removeItem('currentOrderId')
            window.location.href  = '/StudentCoursePage'
        }
      }

      capturePayment();
    }
  }, [payerId, paymentId]);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Processing Payment.... Please Wait</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}

export default Payment_ReturnPage;
