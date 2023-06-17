import React from "react";
import AdminView from "../../../components/Static/AdminView";
import axios from "axios";
import Popup from "../../../components/Admin/Popup";

export default function popup({ setting }) {
  return <AdminView Component={<Popup setting={setting} />} />;
}

export const getServerSideProps = async () => {
  const response = await axios.get("http://localhost:3000/api/popup");
  return { props: { setting: response.data } };
};
