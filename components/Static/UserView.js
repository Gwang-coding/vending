import styled from "styled-components";
import { UserSide } from "../Etc/SIde";
import { UserHeader } from "./Header";
import { useState } from "react";
import Main from "../User/Main";
import PurchaseLog from "../User/PurchaseLog";
import ChargeLog from "../User/ChargeLog";
import Userinfo from "../User/Userinfo";
export default function UserView({ setLogin, user, setUser, data }) {
  const [state, setState] = useState("main");
  let component;
  switch (state) {
    case "main":
      component = <Main data={data} />;
      break;
    case "purchaselog":
      component = <PurchaseLog user={user} setState={setState} data={data} />;
      break;
    case "chargelog":
      component = <ChargeLog user={user} setState={setState} data={data} />;
      break;
    case "edituser":
      component = <Userinfo user={user} setState={setState} data={data} />;
      break;
    default:
      component = <Main data={data} />;
      break;
  }

  return (
    <Section>
      <UserSide user={user} setState={setState} data={data} />
      <Div className="Rectangle-Copy">
        <UserHeader user={user} data={data} setState={setState} />
        <Div className="UserMain">{component}</Div>
      </Div>
    </Section>
  );
}

const Section = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
`;

const Div = styled.div`
  &.Rectangle-Copy {
    width: 85%;
    background-color: #1b1e24;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-bottom: 80px;
  }
  &.Main {
    margin-top: 50px;
    width: 95%;
  }
  &.UserMain {
    width: 100%;
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }
`;
