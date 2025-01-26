import { Outlet } from "react-router-dom";
import Typewriter from "typewriter-effect";
import logo from "../../assets/vite.svg";

const message = "Welcome to PoshMart!";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground flex flex-col items-center">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <h1 className="text-4xl font-extrabold tracking-tight">
            <Typewriter
              options={{ delay: 100 }}
              onInit={(typewriter) => {
                typewriter
                  .changeDelay(100)
                  .pauseFor(500)
                  .typeString(message)
                  .start();
              }}
            />
          </h1>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
