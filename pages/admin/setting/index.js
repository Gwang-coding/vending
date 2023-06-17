import React from "react";
import AdminView from "../../../components/Static/AdminView";
import Setting from "../../../components/Admin/Setting";
import axios from "axios";

export default function index({ setting }) {
  return <AdminView Component={<Setting setting={setting} />} />;
}

export const getServerSideProps = async () => {
  const response = await axios.get("http://localhost:3000/api/setting");
  return { props: { setting: response.data } };
};
