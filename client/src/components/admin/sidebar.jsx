import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { useNavigate } from "react-router-dom";
import { SquareUserRound } from "lucide-react";
import { adminSidebarMenuItems } from "@/config";

const MenuItems = () => {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => {
        const Icon = menuItem.icon;
        return (
          <div
            key={menuItem.id}
            onClick={() => navigate(menuItem.path)}
            className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Icon />
            <span>{menuItem.label}</span>
          </div>
        );
      })}
    </nav>
  );
};

const AdminSideBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <Sheet>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <SquareUserRound size={30} />
                <h1 className="text-2xl font-bold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => navigate("/admin/dashboard")}
        >
          <SquareUserRound size={30} />
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </>
  );
};

export default AdminSideBar;
