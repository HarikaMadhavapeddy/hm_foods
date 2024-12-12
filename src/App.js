import logo from "./logo.svg";
import "./App.css";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import { Provider, useDispatch } from "react-redux";
import { store } from "./Redux/Store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootPage from "./Pages/RootPage";
import Cart from "./Pages/Cart";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/Firebase";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import OrderSummary from "./Pages/OrderSummary";
import Orders from "./Pages/Orders";
import OrderDetails from "./Pages/OrderDetails";
import Reorder from "./Pages/Reorder";
import Manage from "./Pages/Manage";
import MyLocations from "./Pages/MyLocations";
import PaymentSuccess from "./Pages/PaymentSuccess";
import PaymentFailure from "./Pages/PaymentFailure";
import { setUser } from "./Redux/AuthSlice";

function App() {
  
  const Dispatch=useDispatch();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/cart", element: <Cart /> },
        { path: "/signup", element: <Signup /> },
        { path: "/login", element: <Login /> },
        {path:"/OrderSummary/:orderId",element:<OrderSummary/>},
        {path:'/orders',element:<Orders/>},
        {path:'/orders/:orderid',element:<OrderDetails/>},
        {path:'/reorder',element:<Reorder/>},
        {path:'/manage',element:<Manage/>},
        {path:'/location',element:<MyLocations/>},
        {path:'/paymentSuccess/:orderId',element:<PaymentSuccess/>},
        {path:'/paymentFail',element:<PaymentFailure/>}
      ],
    },
  ]);
  useEffect(()=>{
    const subscribe=auth.onAuthStateChanged((user)=>{
      if(user){
        console.log(user);
        Dispatch(setUser({uid:user.uid}));
      }
      else {
        Dispatch(setUser(null));
      }
    });

    return subscribe;
  },[]);
  return (
    <div className="App">
      <ToastContainer/>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
