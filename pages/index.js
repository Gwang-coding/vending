import Login from "../components/User/Login";
import UserView from "../components/Static/UserView";
import { useState } from "react";
import axios from "axios";
import HeadInfo from "../components/Static/HeadInfo";
import convertArrayToObject from "../functions/convertArrayToObject";
export default function Home({ data }) {
  const [login, setLogin] = useState(true);
  const [user, setUser] = useState({
    bank_name: "asd",
    block: 0,
    block_date: null,
    block_memo: "",
    grade: "구매자",
    id: "asdasd1",
    join_date: "2023-06-07T15:00:00.000Z",
    join_ip: "211.197.11.8",
    memo: "",
    money: 12301230120,
    pw: "asdasd1",
    total_buy_money: 0,
    total_money: 0,
  });

  return (
    <>
      <HeadInfo
        title={data.setting.site_name}
        content={data.setting.site_dec}
        keywords={data.setting.site_keyword}
      />
      {login ? (
        <UserView
          setLogin={setLogin}
          user={user}
          setUser={setUser}
          data={data}
        />
      ) : (
        <Login setLogin={setLogin} setUser={setUser} data={data} />
      )}
    </>
  );
}

export const getServerSideProps = async () => {
  const setting_data = await axios.get(
    "http://localhost:3000/api/main_setting"
  );
  const hyperlink_data = await axios.get("http://localhost:3000/api/hyperlink");
  const category = await axios.get("http://localhost:3000/api/category");
  const category_sub = await axios.get(
    "http://localhost:3000/api/category_sub"
  );
  const buy_log_main = await axios.get(
    "http://localhost:3000/api/buy_log_main"
  );

  const data = {
    setting: convertArrayToObject(setting_data.data),
    hyperlink: hyperlink_data.data,
    category: category.data,
    category_sub: category_sub.data,
    buy_log_main: buy_log_main.data,
  };
  return {
    props: {
      data,
    },
  };
};
