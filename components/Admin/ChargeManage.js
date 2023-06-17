import styled from "styled-components";
import dynamic from "next/dynamic";
import { converDate } from "../../functions/converDate";
import React, { useState } from "react";
import axios from "axios";
import { addCommas } from "../../functions/addCommas";
const Calendar = dynamic(() => import("../Admin/Calendar"), { ssr: false });

function chunkArray(array, size) {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    chunkedArray.push(chunk);
  }
  return chunkedArray;
}

export default function ChargeManage() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // 현재 페이지에 해당하는 데이터 가져오기
  const getCurrentPageData = () => {
    const chunkedData = chunkArray(data, pageSize);
    if (currentPage <= chunkedData.length) {
      return chunkedData[currentPage - 1];
    }
    return [];
  };

  const onConfirm = async () => {
    const startDateValue = converDate(startDate);
    const endDateValue = converDate(endDate);
    const _data = {
      start: startDateValue,
      end: endDateValue,
    };
    const response = await axios.post(
      "http://localhost:3000/api/getcharge",
      _data
    );
    setData(response.data);
  };
  return (
    <>
      <Div className="Wrapper">
        <Div className="TopBox">
          <Span className="Title">충전관리</Span>
          <Div className="Top">
            <Calendar
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
            <Btn onClick={onConfirm}>
              <Span className="BtnText">적용</Span>
            </Btn>
          </Div>
        </Div>
        <Div className="Bar">
          <Span className="BarText">NO</Span>
          <Span className="BarText">충전날짜</Span>
          <Span className="BarText">유저아이디</Span>
          <Span className="BarText">입금자명</Span>
          <Span className="BarText">충전방법</Span>
          <Span className="BarText">결과</Span>
          <Span className="BarText">금액</Span>
        </Div>
        {getCurrentPageData().map((item, index) => {
          const dataIndex = (currentPage - 1) * pageSize + index + 1;
          return (
            <React.Fragment key={index}>
              <Div className="Info">
                <Span>{dataIndex}</Span>
                <Span>{item.date}</Span>
                <Span>{item.userid}</Span>
                <Span>{item.bank_name}</Span>
                <Span>{item.how_buy}</Span>
                <Span>{item.result}</Span>
                <Span>{addCommas(item.price)}</Span>
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
    justify-content: space-between;
  }
  &.Bar {
    display: grid;
    grid-template-columns: 5fr 22fr 13fr 13fr 13fr 9fr 13fr;
    padding: 15px 40px;
    text-align: center;
    width: 100%;
    background-color: #31333a;
  }
  &.Info {
    display: grid;
    grid-template-columns: 5fr 22fr 13fr 13fr 13fr 9fr 13fr;
    width: 100%;
    text-align: center;
    padding: 20px 40px;
    background-color: #272a31;
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
  &.BtnText {
    font-weight: 600;
    color: #fff;
  }
  &.BarText {
    font-size: 16px;
    font-weight: bold;
  }
`;
const Input = styled.input``;
const Btn = styled.button`
  width: 150px;
  height: 46px;
  padding: 5px 20px;
  border-radius: 10px;
  background-color: #00abbf;
  margin-left: 10px;
`;

const Img = styled.img`
  &.iconpagnagtion {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;
