import styled from "styled-components";
import { addCommas } from "../../functions/addCommas";
import { useState } from "react";
import PasswordError from "../Etc/PasswordError";
import axios from "axios";
export default function Userinfo({ setState, user, data }) {
  const [pw, setPw] = useState("");
  const [change, setChange] = useState("");
  const [changec, setChangec] = useState("");
  const [modal, setModal] = useState("");

  const onChange = async () => {
    if (user.pw !== pw) {
      setModal(true);
    } else if (change.length < 6) {
      setModal(true);
    } else if (change !== changec) {
      setModal(true);
    } else if (change === user.id) {
      setModal(true);
    } else {
      const _data = { id: user.id, pw: change };
      const res = await axios.post(
        "http://localhost:3000/api/change_pw",
        _data
      );
      if (res.data.exists) {
        setPw("");
        setChange("");
        setChangec("");
        alert("변경");
      }
    }
  };
  return (
    <Div className="Wrapper">
      <Div className="Top">
        <Div className="NameBox">
          <Span className="ID">{user.id}</Span>
          <Span className="Rank">{user.grade}</Span>
        </Div>
        <Div className="TopText">
          <Img src="/assets/images/icon-chargemoney.png" className="point" />
          <Span className="Point">
            총 충전 금액 : {addCommas(user.total_money)}원
          </Span>
          <Img src="/assets/images/icon-purchasemoney.png" className="point" />
          <Span className="Point">
            총 구매 금액 : {addCommas(user.total_buy_money)}원
          </Span>
        </Div>
        <Div className="BtnBox">
          <Span className="Menu" onClick={() => setState("purchaselog")}>
            구매내역
          </Span>
          <Span className="Menu" onClick={() => setState("chargelog")}>
            충전내역
          </Span>

          {data.setting.file_url === "1" && user.grade !== "비구매자" && (
            <Span className="Menu">
              <a href={data.setting.file_url_text} target="_blank">
                파일함
              </a>
            </Span>
          )}

          <Span className="Clicked" onClick={() => setState("edituser")}>
            회원정보수정
          </Span>
        </Div>
      </Div>
      <Div className="Box">
        <Div className="TopBox">
          <Span className="Title">회원정보 수정</Span>
        </Div>
        <Div className="BottomBox">
          <Div className="BottomText">
            <Span className="SubTitle">비밀번호 변경</Span>
          </Div>
          <Div className="Line" />
          <Div className="InputBox">
            <Span>현재 비밀번호</Span>
            <Input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
          </Div>
          <Div className="Line" />
          <Div className="InputBox">
            <Span>변경할 비밀번호</Span>
            <Input
              type="password"
              value={change}
              onChange={(e) => setChange(e.target.value)}
            />
          </Div>
          <Div className="Line" />
          <Div className="InputBox">
            <Span>비밀번호 확인</Span>
            <Input
              type="password"
              value={changec}
              onChange={(e) => setChangec(e.target.value)}
            />
          </Div>
          <Div className="Line" />
        </Div>
        <Div className="Btn">
          <Btn onClick={onChange}>
            <Span className="BtnText">변경하기</Span>
          </Btn>
        </Div>
      </Div>
      {modal && <PasswordError setModal={setModal} />}
    </Div>
  );
}

const Div = styled.div`
  &.Wrapper {
    display: flex;
    flex-direction: column;
  }
  &.Box {
    width: 1320px;
    margin-top: 40px;
    border-radius: 16px;
    background-color: #272a31;
    padding-bottom: 20px;
  }
  &.NameBox {
    display: flex;
    align-items: center;
  }
  &.TopText {
    display: flex;
    justify-content: space-between;
    width: 33%;
    align-items: center;
    margin-bottom: 10px;
  }
  &.TopBox {
    padding: 25px 40px;
    border-bottom: 1px solid #393b44;
  }
  &.BtnBox {
    display: flex;
    text-align: center;
  }
  &.Top {
    width: 1320px;
    height: 184px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 16px;
    padding: 30px 40px 0;
    background-color: #272a31;
  }
  &.Btn {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  &.BottomBox {
    display: flex;
    flex-direction: column;
    margin: 25px 30px;
  }
  &.InputBox {
    width: 40%;
    justify-content: space-between;
    display: flex;
    align-items: center;
  }
  &.BottomText {
    padding: 10px;
    border-left: 4px solid #25b499;
  }
  &.Line {
    height: 1px;
    width: 100%;
    background-color: #393b44;
    margin: 20px 0;
  }
`;

const Span = styled.span`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.56;
  color: #e5e8ea;
  &.ID {
    font-size: 22px;
    font-weight: bold;
  }
  &.Point {
    font-size: 15px;
    font-weight: normal;
    color: #fff;
  }
  &.Rank {
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    background-color: #0cbe9d;
    padding: 1px 7px;
    border-radius: 3px;
    margin-left: 10px;
  }
  &.Menu {
    padding: 10px 0;
    width: 123px;
    font-size: 18px;
    font-weight: 500;
    color: #7a7c85;
    cursor: pointer;
  }
  &.Clicked {
    font-size: 18px;
    font-weight: 500;
    color: #16d8b4;
    width: 123px;
    padding: 10px 0;
    border-bottom: 5px solid #16d8b4;
    cursor: pointer;
  }
  &.Title {
    font-size: 28px;
    font-weight: bold;
  }
  &.SubTitle {
    font-size: 22px;
    font-weight: normal;
  }
  &.BtnText {
    font-weight: bold;
  }
`;
const Input = styled.input`
  width: 300px;
  height: 52px;
  margin-left: 50px;
  border-radius: 10px;
  border: solid 1px #3d3f45;
  background-color: #31333a;
  padding: 10px;
  outline: none;
  font-size: 18px;
  color: #e5e8ea;
`;
const Btn = styled.button`
  padding: 16px 68px;
  border-radius: 35px;
  background-color: #1fa58c;
  margin-bottom: 30px;
`;

const Img = styled.img`
  &.point {
    margin-right: -25px;
  }
`;
