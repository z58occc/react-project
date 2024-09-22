import { Route, Routes } from "react-router-dom";
import Login from "./page/Login";
import Dashboard from "./page/admin/Dashboard";
import AdminProducts from "./page/admin/AdminProducts";
import AdminCoupons from "./page/admin/AdminCoupons";
import AdminOrders from "./page/admin/AdminOrder";
import AdminArticle from "./page/admin/AdminArticle";
import FrountLayout from "./page/front/FrountLayout";
import Home from "./page/front/Home";
import Products from "./page/front/Products";
import Articles from "./page/front/Articles";
import OrderQuery from "./page/front/OrderQuery";
import ProdeuctDetail from "./page/front/ProductDetail";
import ArticleDetail from "./page/front/ArticleDetail";
import Cart from "./page/front/Cart";
import Checkout from "./page/front/Checkout";
import Success from "./page/front/Success";
import TestAPI from "./page/front/testAPI";
import ScrollToTop from "./components/ScrollToTop";
import NextTime from "./page/front/NextTime";



function App() {
  return (
    <div className="App">
      <ScrollToTop></ScrollToTop>
      <Routes>
        <Route path="/" element={<FrountLayout />}>
          <Route path="" element={<Home></Home>}></Route>
          <Route path="products" element={<Products></Products>}></Route>
          <Route path="articles" element={<Articles></Articles>}></Route>
          <Route path="articles/:tag" element={<Articles></Articles>}></Route>
          <Route path="orderQuery" element={<OrderQuery></OrderQuery>}></Route>
          <Route path="nexttime" element={<NextTime></NextTime>}></Route>
          <Route path="products/:searchWord" element={<Products></Products>}></Route>
          <Route path="testAPI" element={<TestAPI></TestAPI>}></Route>
          <Route path="product/:id" element={<ProdeuctDetail></ProdeuctDetail>}></Route>
          <Route path="article/:id" element={<ArticleDetail></ArticleDetail>}></Route>
          <Route path="cart" element={<Cart></Cart>}></Route>
          <Route path="/cart/checkout" element={<Checkout></Checkout>}></Route>
          <Route path="success/:orderId" element={<Success></Success>}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin" element={<Dashboard />}>
          <Route path="products" element={<AdminProducts></AdminProducts>}></Route>
          <Route path="coupons" element={<AdminCoupons></AdminCoupons>}></Route>
          <Route path="orders" element={<AdminOrders></AdminOrders>}></Route>
          <Route path="articles" element={<AdminArticle></AdminArticle>}></Route>
        </Route>
      </Routes>


    </div>
  );
}

export default App;
