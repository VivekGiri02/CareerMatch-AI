import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <Header />

      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
};

export default UserLayout;