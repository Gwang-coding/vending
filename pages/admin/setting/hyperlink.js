import React from "react";
import AdminView from "../../../components/Static/AdminView";
import axios from "axios";
import HyperLink from "../../../components/Admin/HyperLink";

export default function hyperlink({ setting }) {
  return <AdminView Component={<HyperLink setting={setting} />} />;
}

export const getServerSideProps = async () => {
  const response = await axios.get("http://localhost:3000/api/hyperlink");
  return { props: { setting: response.data } };
};
