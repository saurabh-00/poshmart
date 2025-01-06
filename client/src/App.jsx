import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthRegister from "./pages/auth/register";
import AuthLogin from "./pages/auth/login";
import CheckAuth from "./components/common/check-auth";
import { useSelector } from "react-redux";
import { Skeleton } from "./components/ui/skeleton";
import NotFound from "./pages/not-found";

const App = () => {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <BrowserRouter>
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

          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
