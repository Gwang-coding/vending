import React from "react";
import AdminView from "../../../components/Static/AdminView";
import ChargeRequest from "../../../components/Admin/ChargeRequest";
import axios from "axios";

export default function index({ setting }) {
  return <AdminView Component={<ChargeRequest setting={setting} />} />;
}

export const getServerSideProps = async () => {
  const setting = await axios.get(
    "http://localhost:3000/api/getcharge_request"
  );

  return { props: { setting: setting.data } };
};
