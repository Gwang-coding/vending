import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
import { todayDate } from "../../functions/todayDate";
function chunkArray(array, size) {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    chunkedArray.push(chunk);
  }
  return chunkedArray;
}

export default function IP({ setting }) {
  const router = useRouter();
  const [data, setData] = useState(setting);
  const [currentPage, setCurrentPage] = useState(1);
  const [ip, setIp] = useState("");
  const [memo, setMemo] = useState("");
  const [search, setSearch] = useState("");
  const pageSize = 10;

  const onBlock = async () => {
    const _data = { ip: ip, memo: memo, date: todayDate() };
    const res = await axios.post("http://localhost:3000/api/user_block", _data);
    if (res.data.exists) {
      router.reload();
    }
  };

  const onDel = async (_ip) => {
    const _data = { ip: _ip, memo: "", date: "" };
    const res = await axios.post(
      "http://localhost:3000/api/user_block_del",
      _data
    );
    if (res.data.exists) {
      router.reload();
    }
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
      <Div className="Wrapper">
        <Div className="IpTopBox">
          <Span className="Title">아이피 차단</Span>
        </Div>
        <Div className="Line" />
        <Div className="IpTopBox">
          <Div className="IpTop" width="20%">
            <Span>아이피</Span>
            <Input
              width="60%"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
            />
          </Div>
          <Div className="IpTop" width="40%">
            <Span>차단이유</Span>
            <Input
              width="50%"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
            <Btn className="BlockBtn" onClick={onBlock}>
              <Span className="BtnText">차단하기</Span>
            </Btn>
          </Div>
          <Div className="IpTop" width="50%">
            <Input placeholder="아이피" readOnly />
            <Input
              width="35%"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Btn className="SearchBtn">
              <Span>검색</Span>
            </Btn>
          </Div>
        </Div>
        <Div className="Line" />
        <Div className="IpTopBox">
          <Span className="SubTitle">아이피 차단 목록</Span>
        </Div>
        <Div className="Bar">
          <Span className="BarText">NO</Span>
          <Span className="BarText">아이피</Span>
          <Span className="BarText">차단이유</Span>
          <Span className="BarText">차단날짜</Span>
          <Span className="BarText" />
        </Div>
        {getCurrentPageData().map((item, index) => {
          const dataIndex = (currentPage - 1) * pageSize + index + 1;
          return (
            <React.Fragment key={index}>
              <Div className="Info">
                <Span>{dataIndex}</Span>
                <Span>{item.join_ip}</Span>
                <Span>{item.block_memo}</Span>
                <Span>{item.block_date}</Span>
                <Btn className="DelBtn" onClick={() => onDel(item.join_ip)}>
                  삭제
                </Btn>
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
  &.IpTopBox {
    width: 100%;
    display: flex;
    padding: 30px 40px;
    justify-content: space-between;
  }
  &.IpTop {
    width: ${(props) => props.width};
    display: flex;
    align-items: center;
  }
  &.Bar {
    display: grid;
    grid-template-columns: 5fr 22fr 52fr 13fr 3.6fr;
    text-align: center;
    padding: 15px 40px;
    width: 100%;
    background-color: #31333a;
  }
  &.Info {
    display: grid;
    grid-template-columns: 5fr 22fr 52fr 13fr 3.6fr;
    text-align: center;
    width: 100%;
    padding: 20px 40px;
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
    border-radius: 50%;
    background-color: #00abbf;
    cursor: pointer;
  }
  &.Line {
    height: 1px;
    width: 100%;
    background-color: #393b44;
  }
`;
const Span = styled.span`
  font-size: 15px;
  font-weight: normal;
  line-height: 1.46;
  color: #e5e8ea;
  &.Title {
    font-size: 26px;
    font-weight: bold;
  }
  &.SubTitle {
    font-size: 22px;
    font-weight: bold;
  }
  &.BtnText {
    font-weight: 600;
    color: #fff;
  }
  &.BarText {
    font-size: 16px;
    font-weight: bold;
  }
`;
const Input = styled.input`
  width: ${(props) => props.width};
  height: 46px;
  border-radius: 10px;
  border: solid 1px #3d3f45;
  background-color: #31333a;
  margin-left: 15px;
  padding-left: 10px;
  font-size: 15px;
  font-weight: normal;
  color: #e5e8ea;
  outline: none;
`;
const Btn = styled.button`
  &.BlockBtn {
    height: 46px;
    padding: 11px 27px;
    border-radius: 10px;
    background-color: #f34a7e;
    margin-left: 15px;
  }
  &.SearchBtn {
    height: 46px;
    padding: 11px 27px;
    border-radius: 10px;
    background-color: #00abbf;
    margin-left: 15px;
  }
  &.DelBtn {
    font-size: 15px;
    color: #3dc5d6;
    border: none;
    background: none;
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
