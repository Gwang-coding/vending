import styled from "styled-components";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import axios from "axios";
import { addCommas } from "../../functions/addCommas";
import { converDate } from "../../functions/converDate";
const Calendar = dynamic(() => import("../Admin/Calendar"), { ssr: false });

function chunkArray(array, size) {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    chunkedArray.push(chunk);
  }
  return chunkedArray;
}

export default function SellLog() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("아이디");
  const [search, setSearch] = useState("");

  // 현재 페이지에 해당하는 데이터 가져오기
  const getCurrentPageData = () => {
    const chunkedData = chunkArray(data, pageSize);
    if (currentPage <= chunkedData.length) {
      return chunkedData[currentPage - 1];
    }
    return [];
  };

  const onSearch = async () => {
    const _id =
      category === "아이디"
        ? "user_id"
        : category === "상품명"
        ? "product"
        : "product_id";
    const startDateValue = converDate(startDate);
    const endDateValue = converDate(endDate);
    const _data = {
      id: _id,
      search: search,
      start: startDateValue,
      end: endDateValue,
    };

    const response = await axios.post(
      "http://localhost:3000/api/getsell_search",
      _data
    );
    setData(response.data);
  };

  const onConfirm = async () => {
    const startDateValue = converDate(startDate);
    const endDateValue = converDate(endDate);
    const _data = {
      start: startDateValue,
      end: endDateValue,
    };
    const response = await axios.post(
      "http://localhost:3000/api/getsell",
      _data
    );
    setData(response.data);
  };
  return (
    <>
      <Div className="Wrapper">
        <Div className="TopBox">
          <Span className="Title">판매내역</Span>
          <Div className="Top">
            <Div className="InputBox" onClick={() => setOpen(!open)}>
              <Span>{category}</Span>
              <Img src="/assets/images/icon-a-right-gray.png" />
            </Div>
            {open && (
              <Div className="LinkDropdown" onClick={() => setOpen(false)}>
                <Span onClick={() => setCategory("아이디")}>아이디</Span>
                <Span onClick={() => setCategory("상품명")}>상품명</Span>
                <Span onClick={() => setCategory("상품")}>상품</Span>
              </Div>
            )}
            <Input value={search} onChange={(e) => setSearch(e.target.value)} />
            <Btn className="SearchBtn" onClick={onSearch}>
              <Span className="BtnText">검색</Span>
            </Btn>
          </Div>
          <Div className="Top">
            <Calendar
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
            <Btn className="ApplyBtn" onClick={onConfirm}>
              <Span className="BarText">적용</Span>
            </Btn>
          </Div>
        </Div>
        <Div className="Bar">
          <Span className="BarText">NO</Span>
          <Span className="BarText">판매날짜</Span>
          <Span className="BarText">유저아이디</Span>
          <Span className="BarText">상품명</Span>
          <Span className="BarText">단위</Span>
          <Span className="BarText">금액</Span>
          <Span className="BarText">상품</Span>
        </Div>
        {getCurrentPageData().map((item, index) => {
          const dataIndex = (currentPage - 1) * pageSize + index + 1;
          return (
            <React.Fragment key={index}>
              <Div className="Info">
                <Span>{dataIndex}</Span>
                <Span>{item.date}</Span>
                <Span>{item.user_id}</Span>
                <Span>{item.product}</Span>
                <Span>{item.day}일</Span>
                <Span>{addCommas(item.price)}원</Span>
                <Span>{item.product_id}</Span>
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
  &.TopBox {
    width: 100%;
    padding: 25px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &.Top {
    display: flex;
    align-items: center;
  }
  &.Bar {
    display: grid;
    padding: 15px 40px;
    width: 100%;
    grid-template-columns: 5fr 22fr 13fr 13fr 9fr 13fr 22fr;
    background-color: #31333a;
    text-align: center;
  }
  &.Info {
    display: grid;
    width: 100%;
    grid-template-columns: 5fr 22fr 13fr 13fr 9fr 13fr 22fr;
    text-align: center;
    padding: 20px 40px;
  }
  &.InputBox {
    cursor: pointer;
    width: 180px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 46px;
    padding: 15px;
    border-radius: 10px;
    border: solid 1px #3d3f45;
    background-color: #31333a;
    cursor: pointer;
  }
  &.LinkDropdown {
    position: absolute;
    margin-top: 210px;
    width: 180px;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 20px;
    padding: 20px;
    border-radius: 10px;
    border: solid 1px #3d3f45;
    background-color: #31333a;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1;
    cursor: pointer;
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
    border-radius: 50%;
    background-color: #00abbf;
    color: #fff;
    cursor: pointer;
  }
  &.Line {
    height: 1px;
    width: 100%;
    background-color: #393b44;
  }
`;
const Span = styled.span`
  color: #e5e8ea;
  line-height: 1.46;
  font-weight: normal;
  font-size: 15px;
  &.Title {
    font-size: 26px;
    font-weight: bold;
  }
  &.BarText {
    font-size: 16px;
    font-weight: bold;
  }
  &.BtnText {
    color: #fff;
    weight: 600;
  }
`;
const Input = styled.input`
  height: 46px;
  border-radius: 10px;
  border: solid 1px #3d3f45;
  background-color: #31333a;
  padding: 10px;
  margin: 0 20px;
  font-size: 17px;
  font-weight: normal;
  color: #fff;
  outline: none;
`;
const Btn = styled.button`
  &.ApplyBtn {
    width: 150px;
    height: 46px;
    padding: 5px 20px;
    border-radius: 10px;
    background-color: #00abbf;
    margin-left: 10px;
  }
  &.SearchBtn {
    height: 46px;
    padding: 11px 27px;
    border-radius: 10px;
    background-color: #f34a7e;
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
