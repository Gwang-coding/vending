import React from "react";
import AdminView from "../../components/Static/AdminView";
import Design from "../../components/Admin/Design";
import axios from "axios";

export default function index({ setting }) {
  return <AdminView Component={<Design setting={setting} />} />;
}

export const getServerSideProps = async () => {
  const response = await axios.get("http://localhost:3000/api/design");
  return { props: { setting: response.data } };
};
