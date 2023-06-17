import React from "react";
import AdminView from "../../../components/Static/AdminView";
import Category from "../../../components/Admin/Category";
import axios from "axios";

export default function index({ setting, setting_sub }) {
  return (
    <AdminView
      Component={<Category setting={setting} setting_sub={setting_sub} />}
    />
  );
}

export const getServerSideProps = async () => {
  const response = await axios.get("http://localhost:3000/api/category");
  const response_sub = await axios.get(
    "http://localhost:3000/api/category_sub"
  );
  return { props: { setting: response.data, setting_sub: response_sub.data } };
};
