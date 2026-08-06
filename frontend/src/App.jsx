// src/App.jsx
import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

/* ─ layouts (eager: shared shell for every page) ─ */
import MainLayout from "./layouts/MainLayout";
import InventoryLayout from "./layouts/InventoryLayout";

/* ─ landing page (eager: fastest first paint) ─ */
import Home from "./pages/Home";

/* ─ route guard ─ */
import PrivateRoute from "./routes/PrivateRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ─ public pages ─ */
const About = lazy(() => import("./pages/About"));
const Collection = lazy(() => import("./pages/Collection"));
const Content = lazy(() => import("./pages/Content"));
const Product = lazy(() => import("./pages/Product"));
const Cart = lazy(() => import("./pages/Cart"));
const Search = lazy(() => import("./pages/Search"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const BlogList = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Profile = lazy(() => import("./pages/Profile"));

/* ─ customer-only pages ─ */
const Orders = lazy(() => import("./pages/Orders"));
const Shipping = lazy(() => import("./pages/Shipping"));
const PlaceOrder = lazy(() => import("./pages/PlaceOrder"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));

/* ─ admin pages ─ */
const Inventory = lazy(() => import("./pages/Inventory"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddProduct = lazy(() => import("./pages/Inventory/AddProduct"));
const EditProduct = lazy(() => import("./pages/Inventory/EditProduct"));
const InventoryOrder = lazy(() => import("./pages/InventoryOrder"));
const CustomerOrderDetails = lazy(() => import("./pages/CustomerOrderDetails"));
const SalesManage = lazy(() => import("./pages/Inventory/SalesManage"));
const Logistics = lazy(() => import("./pages/Inventory/Logistics"));
const CreateShipment = lazy(() =>
  import("./components/Logistics/CreatShipment")
);
const CustomerInventoryOrderDetails = lazy(() =>
  import("./pages/Inventory/CustomerInventoryOrderDetails")
);
const CustomerAccountDetails = lazy(() =>
  import("./pages/Inventory/CustomerAccountDetails")
);
const Settings = lazy(() => import("./pages/Inventory/Settings"));
const ProductTransfer = lazy(() => import("./pages/Inventory/ProductTransfer"));
const InvMan = lazy(() => import("./pages/InvMan"));
const InvManOrderDetails = lazy(() =>
  import("./components/InventoryManager/InvManOrderDetails")
);
const InvManViewOrder = lazy(() =>
  import("./components/InventoryManager/InvManViewOrder")
);
const BulkAddProduct = lazy(() => import("./pages/Inventory/BulkAddProduct"));
const StockManagementView = lazy(() =>
  import("./components/StockManager/StockManagementView")
);
const BlogAdminList = lazy(() => import("./pages/Inventory/BlogAdminList"));
const BlogEditor = lazy(() => import("./pages/Inventory/BlogEditor"));

/* ─ suspense fallback shown while a page chunk downloads ─ */
function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
    </div>
  );
}

export default function App() {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* ─ Public ─ */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="search" element={<Search />} />
            <Route path="cart" element={<Cart />} />
            <Route path="collection" element={<Collection />} />
            <Route path="collection/:id" element={<Collection />} />
            <Route path="content" element={<Content />} />
            <Route path="product/:productId" element={<Product />} />
            <Route path="orders" element={<Orders />} />
            <Route path="shipping" element={<Shipping />} />
            <Route path="place-order" element={<PlaceOrder />} />
            <Route path="order-success" element={<OrderSuccess />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="blog" element={<BlogList />} />
            <Route path="blog/:slug" element={<BlogDetail />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* ─ Logged-in users ─ */}
          <Route element={<PrivateRoute />}>
            <Route element={<MainLayout />}></Route>
          </Route>

          {/* ─ Admin only ─ */}
          <Route element={<PrivateRoute roles={true} />}>
            <Route element={<InventoryLayout />}>
              <Route path="inventory" element={<Inventory />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route
                path="customer-order-details/:id"
                element={<CustomerOrderDetails />}
              />
              <Route path="inventory/orders" element={<InventoryOrder />} />
              <Route path="inventoryManager" element={<InvMan />} />
              <Route path="transfer" element={<ProductTransfer />} />
              <Route
                path="/invman-order-details/:id"
                element={<InvManOrderDetails />}
              />
              <Route
                path="/invent-order-details/:id"
                element={<InvManViewOrder />}
              />

              <Route path="sales" element={<SalesManage />} />
              <Route path="logistics">
                <Route index element={<Logistics />} />
                <Route path="create-shipment" element={<CreateShipment />} />
              </Route>

              <Route path="customers">
                <Route index element={<CustomerInventoryOrderDetails />} />
                <Route path=":id" element={<CustomerAccountDetails />} />
                {/* ☝️ Use ":id" to match useParams().id */}
              </Route>

              <Route path="settings" element={<Settings />} />
              <Route path="/stock" element={<StockManagementView />} />
              <Route path="inventory/add-product" element={<AddProduct />} />
              <Route
                path="inventory/edit-product/:id"
                element={<EditProduct />}
              />
              <Route
                path="inventory/bulk-product"
                element={<BulkAddProduct />}
              />
              <Route path="inventory/blogs" element={<BlogAdminList />} />
              <Route path="inventory/blogs/new" element={<BlogEditor />} />
              <Route path="inventory/blogs/:id" element={<BlogEditor />} />
            </Route>
          </Route>

          {/* ─ Fallback ─ */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </>
  );
}
