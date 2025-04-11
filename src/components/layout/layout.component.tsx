import { Outlet } from "react-router-dom";
import Footer from "../footer/footer.component";
import Header from "../header/header.component";
import { Toaster } from "../ui/sonner";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 w-full">
        <Outlet />
        <Toaster />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
