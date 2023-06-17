import React from "react";
import AdminView from "../../../components/Static/AdminView";
import axios from "axios";
import Notice from "../../../components/Admin/Notice";

export default function notice({ setting }) {
  return <AdminView Component={<Notice setting={setting} />} />;
}

export const getServerSideProps = async () => {
  const response = await axios.get("http://localhost:3000/api/setting");
  return { props: { setting: response.data } };
};
