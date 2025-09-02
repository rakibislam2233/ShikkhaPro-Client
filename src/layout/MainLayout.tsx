import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <section className="w-full h-full">
      <Navbar />
      <Outlet />
      <Footer />
    </section>
  );
};

export default MainLayout;
