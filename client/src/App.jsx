import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthUser } from "./store/auth-slice";
import { Skeleton } from "./components/ui/skeleton";
import CheckAuth from "./components/common/check-auth";
import AuthLayout from "./components/auth/layout";
import AuthRegister from "./pages/auth/register";
import AuthLogin from "./pages/auth/login";
import AdminLayout from "./components/admin/layout";
import AdminDashboard from "./pages/admin/dashboard";
import AdminProducts from "./pages/admin/products";
import AdminFeatures from "./pages/admin/features";
import AdminOrders from "./pages/admin/orders";

import NotFound from "./pages/not-found";


const App = () => {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthUser());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800] bg-black min-h-screen" />;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        ></Route>

        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="register" element={<AuthRegister />} />
          <Route path="login" element={<AuthLogin />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={AdminDashboard} />
          <Route path="products" element={AdminProducts} />
          <Route path="features" element={AdminFeatures} />
          <Route path="orders" element={AdminOrders} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
