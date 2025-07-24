// src/components/Layout.jsx
import { Outlet } from "react-router-dom";
import Header from "../components/header";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="p-4 min-h-screen bg-gray-50">
        <Outlet />
      </main>
    </>
  );
}
