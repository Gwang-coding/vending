import styled from "styled-components";
import { AdminSide } from "../Etc/SIde";
import { Header } from "./Header";
import Menu from "../Admin/Menu";
export default function AdminView({ Component, data }) {
  return (
    <Section>
      <AdminSide />
      <Div className="Rectangle-Copy">
        <Header />
        <Div className="Main">
          <Menu />
          {Component}
        </Div>
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
    height: 100%; /* 부모 요소인 Section의 높이를 상속 */
  }
  &.Main {
    margin-top: 50px;
    width: 95%;
    height: 100%; /* 부모 요소인 Rectangle-Copy의 높이를 상속 */
  }
  &.UserMain {
    width: 100%;
    margin-top: 50px;
    display: flex;
    justify-content: center;
    height: 100%; /* 부모 요소의 높이를 상속 */
  }
`;
