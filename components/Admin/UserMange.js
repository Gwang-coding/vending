import { useState } from "react";
import styled from "styled-components";
import { addCommas } from "../../functions/addCommas";
import axios from "axios";
export default function UserMange({ index, data, setData, setModify }) {
  const [user, setUser] = useState({
    bank_name: data[index].bank_name,
    block: data[index].block,
    block_date: data[index].block_date,
    block_memo: data[index].block_memo,
    grade: data[index].grade,
    id: data[index].id,
    join_date: data[index].join_date,
    join_ip: data[index].join_ip,
    memo: data[index].memo,
    money: data[index].money,
    pw: data[index].pw,
    total_buy_money: data[index].total_buy_money,
  });
  const [open, setOpen] = useState(false);

  //삭제
  const delData = async () => {
    const updatedData = data.filter((item) => item.id !== user.id);

    await axios.post("/api/user_list_del", user);

    setData(updatedData);
    setModify("normal");
  };

  //수정하기
  const modifyData = async () => {
    const updatedData = data.map((item) => {
      if (item.id === user.id) {
        return user;
      }
      return item;
    });

    await axios.post("/api/user_list_write", user);

    setData(updatedData);
    setModify("normal");
  };
  //값 변경
  const updateValue = async (name, value) => {
    setUser((prevUser) => {
      return { ...prevUser, [name]: value };
    });
  };
  return (
    <Div className="Wrapper">
      <Div className="UserTopBox">
        <Div className="UserTop">
          <Span className="Title">{user.id}님의 회원관리</Span>
          <Div className="RankBox">
            <Span className="RankText">미인증</Span>
          </Div>
        </Div>
        <Div className="UserTop">
          <Btn className="DelBtn" onClick={delData}>
            <Span className="BtnText">삭제하기</Span>
          </Btn>
          <Btn className="ModBtn" onClick={modifyData}>
            <Span className="BtnText">수정하기</Span>
          </Btn>
        </Div>
      </Div>
      <Div className="PercentWrapper">
        <Div className="PercentBox">
          <Span>아이디</Span>
          <Div className="FixedValue">
            <Span className="InputText">{user.id}</Span>
          </Div>
        </Div>
        <Div className="PercentBox">
          <Span>보유금액</Span>
          <Input
            type="text"
            value={user.money}
            onChange={(e) => updateValue("money", e.target.value)}
          />
        </Div>
        <Div className="PercentBox">
          <Span>비밀번호</Span>
          <Input
            type="password"
            value={user.pw}
            onChange={(e) => updateValue("pw", e.target.value)}
          />
        </Div>
        <Div className="PercentBox">
          <Span>총 구매금액</Span>
          <Div className="FixedValue">
            <Span className="InputText">{addCommas(user.total_buy_money)}</Span>
          </Div>
        </Div>
        <Div className="PercentBox">
          <Span>입금자명</Span>
          <Input
            value={user.bank_name}
            onChange={(e) => updateValue("bank_name", e.target.value)}
          />
        </Div>
        <Div className="PercentBox">
          <Span>등급</Span>
          <Div className="InputBox" onClick={() => setOpen(!open)}>
            <Span className="InputText">{user.grade}</Span>
            <Img src="/assets/images/icon-a-right-gray.png" />
            {open && (
              <Div className="LinkDropdown" onClick={() => setOpen(false)}>
                {[
                  "비구매자",
                  "구매자",
                  "리셀러",
                  "VIP",
                  "VVIP",
                  "RVIP",
                  "직원",
                  "관리자",
                ].map((item, index) => {
                  return (
                    <Span
                      onClick={() => updateValue("grade", item)}
                      key={index}
                    >
                      {item}
                    </Span>
                  );
                })}
              </Div>
            )}
          </Div>
        </Div>
        <Div className="PercentBox">
          <Span>가입아이피</Span>
          <Div className="FixedValue">
            <Span className="InputText">{user.join_ip}</Span>
            <Btn className="BlockBtn" onClick={() => updateValue("block", "1")}>
              차단
            </Btn>
          </Div>
        </Div>
        <Div className="PercentBox">
          <Span>메모</Span>
          <Input
            value={user.memo}
            onChange={(e) => updateValue("memo", e.target.value)}
          />
        </Div>
      </Div>
    </Div>
  );
}

const Div = styled.div`
  &.Wrapper {
    width: 100%;
    margin-top: 40px;
    border-radius: 16px;
    background-color: #272a31;
    padding: 25px 40px;
  }
  &.UserTopBox {
    width: 100%;
    display: flex;
    padding-bottom: 20px;
    justify-content: space-between;
    border-bottom: 1px solid #3d3f45;
  }
  &.UserTop {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &.RankBox {
    height: 26px;
    margin-left: 10px;
    padding: 2px 8px;
    border-radius: 13px;
    background-color: #515464;
  }
  &.PercentWrapper {
    width: 100%;
    padding: 20px 100px 20px 0;
    display: grid;
    row-gap: 20px;
    column-gap: 200px;
    grid-template-columns: 1fr 1fr;
  }
  &.PercentBox {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }
  &.InputBox {
    width: 70%;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    border-radius: 10px;
    border: solid 1px #3d3f45;
    background-color: #31333a;
    cursor: pointer;
    position: relative;
  }
  &.FixedValue {
    width: 70%;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    border-radius: 10px;
    border: solid 1px #3d3f45;
    background-color: #272a31;
  }
  &.LinkDropdown {
    position: absolute;
    width: 100%;
    display: grid;
    padding: 20px;
    grid-template-columns: 1fr;
    border-radius: 10px;
    row-gap: 10px;
    border: solid 1px #3d3f45;
    box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.2);
    background-color: #31333a;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1;
    cursor: pointer;
    left: 0;
    top: 60px;
  }
`;
const Span = styled.span`
  font-size: 18px;
  font-weight: normal;
  line-height: 1.46;
  color: #e5e8ea;

  &.Title {
    font-size: 26px;
    font-weight: bold;
  }
  &.InputText {
    font-size: 15px;
  }
  &.BtnText {
    font-size: 15px;
    font-weight: 600;
    color: #fff;
  }
  &.RankText {
    font-size: 13px;
  }
`;
const Input = styled.input`
  width: 70%;
  height: 52px;
  padding-left: 10px;
  border-radius: 10px;
  border: solid 1px #3d3f45;
  background-color: #31333a;
  font-size: 15px;
  font-weight: normal;
  color: #e5e8ea;
  outline: none;
`;
const Btn = styled.button`
  &.DelBtn {
    margin-left: 10px;
    height: 40px;
    padding: 8px 24px;
    border-radius: 23px;
    background-color: #474950;
  }
  &.ModBtn {
    margin-left: 10px;
    height: 40px;
    padding: 8px 24px;
    border-radius: 23px;
    background-color: #00abbf;
  }
  &.BlockBtn {
    font-size: 15px;
    color: #3dc5d6;
    border: none;
    background: none;
  }
`;

const Img = styled.img``;
