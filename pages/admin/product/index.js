import React from "react";
import AdminView from "../../../components/Static/AdminView";
import ProductManage from "../../../components/Admin/ProductManage";
import axios from "axios";

export default function index({ category, category_sub, setting }) {
  return (
    <AdminView
      Component={
        <ProductManage
          category={category}
          category_sub={category_sub}
          setting={setting}
        />
      }
    />
  );
}

export const getServerSideProps = async () => {
  const category = await axios.get("http://localhost:3000/api/category");
  const category_sub = await axios.get(
    "http://localhost:3000/api/category_sub"
  );
  const setting = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      category: category.data,
      category_sub: category_sub.data,
      setting: setting.data,
    },
  };
};
