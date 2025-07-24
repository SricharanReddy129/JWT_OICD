import { Routes, Route } from "react-router-dom";
import Login from "../src/pages/auth/Login";
import Register from "../src/pages/auth/Register";
import ForgotPassword from "../src/pages/auth/ForgotPassword";
import Home from "../src/pages/user/Home";
import Profile from "../src/pages/user/Profile";
import EditProfile from "../src/pages/user/EditProfile";
import Layout from "./components/Layout";
import MainLayout from "./components/MainLayout";
import AdminDashboard from "../src/pages/admin/adminDashboard/AdminDashboard";
import UserManagement from "./pages/admin/userManagement/UserManagement";
import RoleManagement from "./pages/admin/roleManagement/RoleManagement";
import PermissionManagement from "./pages/admin/permissionManagement/PermissionManagement";
import PermissionGroupManagement from "./pages/admin/PermissionGroupManagement";
// import AccessPointManagement from "./pages/admin/accessPointManagement/AccessPointManagement";
import AdminRoute from "./routes/AdminRoute";
import EditUser from "./pages/admin/userManagement/EditUser";
import EditUserHr from "./pages/user/manager/EditUserHr";
import CreateUser from "./pages/admin/userManagement/CreateUser";
import UpdateUserRoles from "./pages/admin/userManagement/UpdateUserRoles";
import EditUserRoleForm from "./pages/admin/userManagement/EditUserRoleForm";

import AccessPointList from '../src/pages/admin/accessPointManagement/AccessPointList';
import AccessPointForm from '../src/pages/admin/accessPointManagement/AccessPointForm';
import AccessPointDetails from '../src/pages/admin/accessPointManagement/AccessPointDetails';
import AccessPointEdit from '../src/pages/admin/accessPointManagement/AccessPointEdit';

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot" element={<ForgotPassword />} />

      {/* User layout */}
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/edit-user/:user_id" element={<EditUserHr />} />
      </Route>

      {/* Admin layout with sidebar */}
      <Route element={<AdminRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/users/create" element={<CreateUser />} />
          <Route path="/admin/users/:id/edit" element={<EditUser />} />
          <Route path="/admin/users/roles" element={<UpdateUserRoles />} />
          <Route path="/admin/users/:userId/edit-role" element={<EditUserRoleForm />} />
          <Route path="/admin/roles" element={<RoleManagement />} />
          <Route path="/admin/permissions" element={<PermissionManagement />} />
          <Route path="/admin/permission-groups" element={<PermissionGroupManagement />} />
          {/* <Route path="/admin/access-points" element={<AccessPointManagement />} /> */}
          <Route path="/admin/accesspoints" element={<AccessPointList />} />
          <Route path="/admin/accesspoints/create" element={<AccessPointForm />} />
          <Route path="/admin/accesspoints/:access_id" element={<AccessPointDetails />} />
          <Route path="/admin/accesspoints/edit/:access_id" element={<AccessPointEdit />} />
        </Route>
      </Route>
    </Routes>
  );
}
