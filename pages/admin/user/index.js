import React from "react";
import AdminView from "../../../components/Static/AdminView";
import User from "../../../components/Admin/User";
import axios from "axios";

export default function index({ setting }) {
  return <AdminView Component={<User setting={setting} />} />;
}

export const getServerSideProps = async () => {
  const response = await axios.get("http://localhost:3000/api/user_list");
  return { props: { setting: response.data } };
};
