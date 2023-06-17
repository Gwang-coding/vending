import React from "react";
import AdminView from "../../components/Static/AdminView";
import Profit from "../../components/Admin/Profit";

export default function index() {
  return <AdminView Component={<Profit />} />;
}
