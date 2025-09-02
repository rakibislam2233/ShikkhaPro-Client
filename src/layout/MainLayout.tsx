import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="w-full h-full flex ">
      <section className="w-full h-full">
        <Outlet />
      </section>
    </div>
  );
};

export default MainLayout;
