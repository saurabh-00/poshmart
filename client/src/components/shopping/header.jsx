import {
  AlignJustify,
  House,
  LogOut,
  ShoppingCart,
  UserRoundCog,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { shoppingViewHeaderMenuItems } from "@/config";
import { Label } from "../ui/label";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import { fetchCart } from "@/store/shop/cart-slice";
import UserCartWrapper from "./cart-wrapper";

const ShopMenu = ({ setOpenMenu }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (menuItem) => {
    sessionStorage.removeItem("filters");
    const filters =
      menuItem.id !== "home" &&
      menuItem.id !== "products" &&
      menuItem.id !== "search"
        ? { category: [menuItem.id] }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(filters || {}));
    if (location.pathname.includes("listing") && filters !== null) {
      setSearchParams(
        new URLSearchParams(`category=${encodeURIComponent(menuItem.id)}`)
      );
    } else {
      navigate(menuItem.path);
    }
    setOpenMenu(false);
  };

  return (
    <nav className="flex flex-col gap-6 mb-3 lg:mb-0 lg:items-center lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          key={`${menuItem.id}_menu`}
          className="text-sm font-medium cursor-pointer"
          onClick={() => handleNavigate(menuItem)}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
};

const ShopDropdown = ({ setOpenMenu }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    setOpenMenu(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="bg-black cursor-pointer">
          <AvatarFallback className="bg-black text-white font-extrabold">
            {user?.username[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Logged in as {user?.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            navigate("/shop/account");
            setOpenMenu(false);
          }}
        >
          <UserRoundCog className="mr-2 h-4 w-4" />
          Account
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ShoppingHeader = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const { cart } = useSelector((state) => state.shopCart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <House className="h-6 w-6" />
          <span className="text-2xl font-bold">PoshMart</span>
        </Link>
        <div className="hidden lg:block">
          <ShopMenu setOpenMenu={setOpenMenu} />
        </div>
        <div className="flex items-center gap-4">
          <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute top-[0px] right-[4px] font-bold text-xs">
                  {cart?.items?.length || 0}
                </span>
                <span className="sr-only">User cart</span>
              </Button>
            </SheetTrigger>
            <UserCartWrapper
              setOpenCartSheet={setOpenCartSheet}
              cartItems={
                cart && cart?.items && cart?.items.length > 0 ? cart?.items : []
              }
            />
          </Sheet>
          <div className="hidden lg:block">
            <ShopDropdown setOpenMenu={setOpenMenu} />
          </div>
          <Sheet open={openMenu} onOpenChange={setOpenMenu}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <AlignJustify className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full">
              <ShopMenu setOpenMenu={setOpenMenu} />
              <ShopDropdown setOpenMenu={setOpenMenu} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
