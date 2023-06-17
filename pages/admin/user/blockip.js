import React from "react";
import AdminView from "../../../components/Static/AdminView";
import Ip from "../../../components/Admin/Ip";
import axios from "axios";

export default function index({ setting }) {
  return <AdminView Component={<Ip setting={setting} />} />;
}

export const getServerSideProps = async () => {
  const response = await axios.get("http://localhost:3000/api/user_list_ip");
  return { props: { setting: response.data } };
};
