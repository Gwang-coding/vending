import React from "react";
import AdminView from "../../../components/Static/AdminView";
import ChargeManage from "../../../components/Admin/ChargeManage";
import axios from "axios";

export default function index() {
  return <AdminView Component={<ChargeManage />} />;
}
