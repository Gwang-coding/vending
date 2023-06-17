import React from "react";
import AdminView from "../../components/Static/AdminView";
import SellLog from "../../components/Admin/SellLog";
import axios from "axios";

export default function index() {
  return <AdminView Component={<SellLog />} />;
}
