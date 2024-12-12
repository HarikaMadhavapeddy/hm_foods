import { ref, set } from "firebase/database";
import React, { useEffect } from "react";
import { auth, database } from "../Firebase/Firebase";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ClearCart } from "../Redux/CartSlice";

export default function PaymentSuccess() {
  const Navigate = useNavigate();
  const Dispatch = useDispatch();
  const params = useParams();
  const {user}=useSelector(state=>state.auth);
  
  
  useEffect(() => {
    if (user?.uid) {
      const Order = JSON.parse(sessionStorage.getItem(params.orderId));
      const Ref = ref(
        database,
        `orders/${user.uid}/${Order.orderId}`
      );

      set(Ref, Order)
        .then((response) => {
          console.log("order created successfully");
          //sessionStorage.setItem(Order.orderId,JSON.stringify(Order));
          Dispatch(ClearCart());
          Navigate(`/OrderSummary/${Order.orderId}`);
        })
        .catch();
    }
  }, [user]);

  return <div>PaymentSuccess</div>;
}
