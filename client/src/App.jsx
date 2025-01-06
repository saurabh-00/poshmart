import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthRegister from "./pages/auth/register";
import AuthLogin from "./pages/auth/login";

const App = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="register" element={<AuthRegister />} />
            <Route path="login" element={<AuthLogin />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
