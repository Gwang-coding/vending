import React, { useEffect } from "react";
import Main from "../../components/Admin/Main";
import AdminView from "../../components/Static/AdminView";
import axios from "axios";
export default function index({ data }) {
  return <AdminView Component={<Main data={data} />} />;
}

export const getServerSideProps = async () => {
  const main = await axios.get("http://localhost:3000/api/main");
  const user_rank = await axios.get("http://localhost:3000/api/user_rank");

  const data = {
    total_user: main.data[0].total_user,
    total_buyer: main.data[0].total_buyer,
    today_user: main.data[0].today_user,
    user_rank: user_rank.data,
    today_charge: main.data[0].today_charge,
    week_charge: main.data[0].week_charge,
    month_charge: main.data[0].month_charge,
    today_buy: main.data[0].today_buy,
    week_buy: main.data[0].week_buy,
    month_buy: main.data[0].month_buy,
    today_profit: main.data[0].today_profit,
    week_profit: main.data[0].week_profit,
    month_profit: main.data[0].month_profit,
  };

  return {
    props: {
      data: data,
    },
  };
};
