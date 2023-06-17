import styled from "styled-components";
import React, { useState } from "react";
import { addCommas } from "../../functions/addCommas";
import UserMange from "./UserMange";
import DelUser from "../Etc/DelUser";
import LogManage from "./LogManage";
import axios from "axios";
function chunkArray(array, size) {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    chunkedArray.push(chunk);
  }
  return chunkedArray;
}

function setColor(type, grade) {
  if (type === "b") {
    switch (grade) {
      case "비구매자":
        return "#27383E";
      case "구매자":
        return "#2B3546";
      case "관리자":
        return "#35373e";
      case "rvip":
        return "#3d3330";
      case "vvip":
        return "#363045";
      case "vip":
        return "#3d372f";
    }
  } else {
    switch (grade) {
      case "비구매자":
        return "#25c1b6";
      case "구매자":
        return "#52a4ff";
      case "관리자":
        return "#c0c1c2";
      case "rvip":
        return "#ff8c2a";
      case "vvip":
        return "#be72fc";
      case "vip":
        return "#ffb621";
    }
  }
}

export default function User({ setting }) {
  const [data, setData] = useState(setting);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [search, setSearch] = useState(""); //검색
  const [modify, setModify] = useState("normal"); //관리
  const [modifyIndex, setModifyIndex] = useState(0);
  const [modal, setModal] = useState(false);

  //검색
  const onSearch = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/user_list_search?id=${search}`
    );
    setData(response.data);
  };

  // 현재 페이지에 해당하는 데이터 가져오기
  const getCurrentPageData = () => {
    const chunkedData = chunkArray(data, pageSize);
    if (currentPage <= chunkedData.length) {
      return chunkedData[currentPage - 1];
    }
    return [];
  };

  return (
    <>
      {modal && <DelUser setModal={setModal} />}
      {modify === "modify" ? (
        <UserMange
          index={modifyIndex}
          data={data}
          setData={setData}
          setModify={setModify}
        />
      ) : modify === "log" ? (
        <LogManage index={modifyIndex} data={data} />
      ) : (
        <>
          <Div className="Wrapper">
            <Div className="UserTopBox">
              <Div className="UserTop" width="200px">
                <Span className="Title">회원관리</Span>
                <Span>총회원:{data.length}명</Span>
              </Div>
              <Div className="UserTop">
                <Btn className="DelBtn" onClick={() => setModal(!modal)}>
                  <Span className="BtnText">비구매자삭제</Span>
                </Btn>
                <Div className="InputBox" width="180px">
                  <Span>아이디</Span>
                  <Img src="/assets/images/icon-a-right-gray.png" />
                  {/* 드롭다운 */}
                  {/* <Div className="Dropdown">
                <Span>hi</Span>
              </Div> */}
                  {/* 드롭다운 */}
                </Div>
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Btn className="SearchBtn" onClick={onSearch}>
                  <Span className="BtnText">검색</Span>
                </Btn>
              </Div>
            </Div>
            <Div className="Bar">
              <Span className="BarText">NO</Span>
              <Span className="BarText">회원아이디</Span>
              <Span className="BarText">입금자명</Span>
              <Span className="BarText">등급</Span>
              <Span className="BarText">가입일</Span>
              <Span className="BarText">보유금액</Span>
              <Span className="BarText">총 구매금액</Span>
              <Span className="BarText" />
              <Span className="BarText" />
            </Div>
            {getCurrentPageData().map((item, index) => {
              const dataIndex = (currentPage - 1) * pageSize + index + 1;
              return (
                <React.Fragment key={index}>
                  <Div className="Info">
                    <Span>{dataIndex}</Span>
                    <Span>{item.id}</Span>
                    <Span>{item.bank_name}</Span>
                    <Span>
                      <Span
                        className="ColorText"
                        bcolor={setColor("b", item.grade)}
                        color={setColor("c", item.grade)}
                      >
                        {item.grade}
                      </Span>
                    </Span>
                    <Span>{item.join_date}</Span>
                    <Span>{addCommas(item.money)}</Span>
                    <Span>{addCommas(item.total_buy_money)}</Span>
                    <Span
                      onClick={() => {
                        setModifyIndex(dataIndex - 1);
                        setModify("modify");
                      }}
                    >
                      <a>관리</a>
                    </Span>
                    <Span
                      onClick={() => {
                        setModifyIndex(dataIndex - 1);
                        setModify("log");
                      }}
                    >
                      <a>로그</a>
                    </Span>
                  </Div>
                  <Div className="Line" />
                </React.Fragment>
              );
            })}
          </Div>
          <Div className="PageBox">
            {/* 이전 페이지 */}
            <Img
              src="/assets/images/icon-pagnagtion-left-2.png"
              className="iconpagnagtion"
              onClick={() => setCurrentPage(1)}
            />
            <Img
              src="/assets/images/icon-pagnagtion-left.png"
              className="iconpagnagtion"
              onClick={() => setCurrentPage(currentPage - 1)}
            />
            {/* 페이지 번호 */}
            {chunkArray(data, pageSize).map((_, index) => {
              const startPage = currentPage - 1 > 2 ? currentPage - 2 : 1;
              const endPage = startPage + 4;

              if (index + 1 >= startPage && index + 1 <= endPage) {
                return (
                  <Div
                    key={index}
                    className={
                      currentPage === index + 1 ? "CheckedText" : "PageText"
                    }
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </Div>
                );
              }
              return null;
            })}
            {/* 다음 페이지 */}
            <Img
              src="/assets/images/icon-pagnagtion-right.png"
              className="iconpagnagtion"
              onClick={() => setCurrentPage(currentPage + 1)}
            />
            <Img
              src="/assets/images/icon-pagnagtion-right-2.png"
              className="iconpagnagtion"
              onClick={() => setCurrentPage(parseInt(data.length / 10) + 1)}
            />
          </Div>
        </>
      )}
    </>
  );
}

const Div = styled.div`
  &.Wrapper {
    width: 100%;
    margin-top: 40px;
    border-radius: 16px;
    background-color: #272a31;
    padding-bottom: 20px;
  }
  &.UserTopBox {
    width: 100%;
    padding: 25px 40px;
    display: flex;
    justify-content: space-between;
  }
  &.UserTop {
    width: ${(props) => props.width};
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &.Bar {
    display: grid;
    padding: 15px 40px;
    width: 100%;
    text-align: center;
    grid-template-columns: 5fr 13fr 13fr 13fr 13fr 13fr 13fr 9fr 9fr;
    background-color: #31333a;
  }
  &.Info {
    display: grid;
    width: 100%;
    text-align: center;
    grid-template-columns: 5fr 13fr 13fr 13fr 13fr 13fr 13fr 9fr 9fr;
    padding: 20px 40px;
    background-color: #272a31;
  }
  &.InputBox {
    cursor: pointer;
    width: 180px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 46px;
    padding: 15px;
    margin-left: 40px;
    border-radius: 10px;
    border: solid 1px #3d3f45;
    background-color: #31333a;
  }
  &.Dropdown {
    position: absolute;
    margin-top: 120px;
    margin-left: -15px;
    width: 180px;
    padding: 20px 20px;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 20px;
    border-radius: 10px;
    background-color: #31333a;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  &.PageBox {
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 30px 0;
    align-items: center;
  }
  &.PageText {
    width: 44px;
    height: 44px;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #7a7c85;
    cursor: pointer;
  }

  &.CheckedText {
    width: 44px;
    height: 44px;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
    border-radius: 50%;
    background-color: #00abbf;
  }
  &.Line {
    height: 1px;
    width: 100%;
    background-color: #393b44;
  }
`;
const Span = styled.span`
  font-size: 15px;
  line-height: 1.46;
  font-weight: normal;
  color: #e5e8ea;
  &.Title {
    font-size: 26px;
    font-weight: bold;
  }
  &.BtnText {
    color: #fff;
    font-weight: 600;
  }
  &.BarText {
    font-size: 16px;
    font-weight: bold;
  }
  &.ColorText {
    padding: 2px 10px;
    border-radius: 13px;
    background-color: ${(props) => props.bcolor};
    color: ${(props) => props.color};
  }
`;
const Input = styled.input`
  width: 250px;
  height: 46px;
  border-radius: 10px;
  border: solid 1px #3d3f45;
  background-color: #31333a;
  margin: 0 10px;
  padding-left: 10px;
  font-size: 15px;
  font-weight: normal;
  color: #e5e8ea;
  outline: none;
`;
const Btn = styled.button`
  &.DelBtn {
    height: 46px;
    padding: 5px 17px;
    border-radius: 10px;
    background-color: #f34a7e;
  }
  &.SearchBtn {
    height: 46px;
    padding: 5px 17px;
    border-radius: 10px;
    background-color: #00abbf;
  }
`;

const Img = styled.img`
  &.iconpagnagtion {
    width: 24px;
    height: 24px;
    margin: 0 10px;
    cursor: pointer;
  }
`;
