import Header from "../components/Header";
import Navbar from "../components/Navbar";
import BottomMenu from "../components/BottomMenu";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    // bottom padding keeps content clear of the floating BottomMenu on mobile
    <div className="px-4 pb-24 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] lg:pb-0">
      {/* top strip + navigation that are always visible */}
      <Header />
      <Navbar />

      {/* current public page renders here */}
      <Outlet />

      {/* floating mobile navigation (hidden on lg+) */}
      <BottomMenu />
    </div>
  );
}
