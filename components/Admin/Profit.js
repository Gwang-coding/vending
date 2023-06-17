import styled from "styled-components";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import axios from "axios";
import { converDate } from "../../functions/converDate";
import { addCommas } from "../../functions/addCommas";
const Calendar = dynamic(() => import("../Admin/Calendar"), { ssr: false });

export default function Profit() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [buy, setBuy] = useState([]);
  const [charge, setCharge] = useState([]);

  const onCalu = (data, value) => {
    let total_price = 0;
    for (let i = 0; i < data.length; i++) {
      const price = parseInt(data[i][value]);
      total_price += price;
    }
    return total_price;
  };

  const onConfirm = async () => {
    const startDateValue = converDate(startDate);
    const endDateValue = converDate(endDate);
    const _data = {
      start: startDateValue,
      end: endDateValue,
    };
    const buy_res = await axios.post(
      "http://localhost:3000/api/buy_log",
      _data
    );
    const charge_res = await axios.post(
      "http://localhost:3000/api/getcharge",
      _data
    );
    setBuy(buy_res.data);
    setCharge(charge_res.data);
  };
  return (
    <>
      <Div className="Wrapper">
        <Div className="TopBox">
          <Div className="Top">
            <Span className="Title">수익 통계</Span>
            <Span>구매된 모든 경우를 산출합니다.</Span>
          </Div>
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
        <Div className="Notice">
          <Img src="/assets/images/icon-info.png" />
          <Span>모든문의는 텔레그램을 통해 주세요. (Telegram : @ supd3sk)</Span>
        </Div>
        <Div className="InfoBox">
          <Div className="Top">
            <Span className="SubTitle">상품 구매</Span>
          </Div>
          <Div className="Buy_firstBar">
            <Span className="BarText">이름</Span>
            <Span className="BarText">단위</Span>
            <Span className="BarText">가격</Span>
            <Span className="BarText">원가</Span>
            <Span className="BarText">개수</Span>
            <Span className="BarText">금액 합</Span>
            <Span className="BarText">차익 합</Span>
          </Div>
          {buy.length === 0 ? (
            <Div className="Buy_firstInfo">
              <Span />
              <Span />
              <Span>구매 기록이 없습니다.</Span>
              <Span />
            </Div>
          ) : (
            buy.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <Div className="Buy_firstInfo">
                    <Span>{item.name}</Span>
                    <Span>{item.day}</Span>
                    <Span>{item.price}</Span>
                    <Span>{item.original}</Span>
                    <Span>{item.total_amount}</Span>
                    <Span>{item.total_price}</Span>
                    <Span>
                      {parseInt(item.total_price) -
                        parseInt(item.total_original)}
                    </Span>
                  </Div>
                  <Div className="Line" />
                </React.Fragment>
              );
            })
          )}

          <Div className="Buy_secondBar">
            <Span className="BarText">총 구매 금액</Span>
            <Span className="BarText">총 구매 차익</Span>
            <Span className="BarText">총 구매 횟수</Span>
            <Span className="BarText">순 이익률</Span>
          </Div>
          <Div className="Buy_secondInfo">
            <Span>{addCommas(onCalu(buy, "price"))}원</Span>
            <Span>
              {addCommas(
                parseInt(onCalu(buy, "total_price")) -
                  parseInt(onCalu(buy, "total_original"))
              )}
              원
            </Span>
            <Span>{addCommas(buy.length)}회</Span>
            <Span>
              {(
                (parseInt(
                  parseInt(onCalu(buy, "total_price")) -
                    parseInt(onCalu(buy, "total_original"))
                ) /
                  parseInt(onCalu(buy, "price"))) *
                100
              ).toFixed(2)}
              %
            </Span>
          </Div>
          <Div className="Line" />
        </Div>

        <Div className="InfoBox">
          <Div className="Top">
            <Span className="SubTitle">입금 충전</Span>
          </Div>
          <Div className="Charge_Bar">
            <Span className="BarText">충전 시도 횟수</Span>
            <Span className="BarText">충전 시도 금액</Span>
            <Span className="BarText">충전 성공 횟수</Span>
            <Span className="BarText">충전 성공 금액</Span>
            <Span className="BarText">충전 성공률</Span>
          </Div>
          <Div className="Charge_Info">
            <Span>{addCommas(charge.length)}회</Span>
            <Span>{addCommas(onCalu(charge, "price"))}원</Span>
            <Span>
              {addCommas(
                charge.filter((item) => item.result === "success").length
              )}
              회
            </Span>
            <Span>
              {addCommas(
                onCalu(
                  charge.filter((item) => item.result === "success"),
                  "price"
                )
              )}
              원
            </Span>
            <Span>
              {(
                (parseInt(
                  charge.filter((item) => item.result === "success").length
                ) /
                  parseInt(charge.length)) *
                100
              ).toFixed(2)}
              %
            </Span>
          </Div>
          <Div className="Line" />
        </Div>

        <Div className="InfoBox">
          <Div className="Top">
            <Span className="SubTitle">문화상품권 충전</Span>
          </Div>
          <Div className="Munsang_Bar">
            <Span className="BarText">충전 성공 횟수</Span>
            <Span className="BarText">충전 성공 금액</Span>
          </Div>
          <Div className="Munsang_Info">
            <Span>
              {addCommas(
                charge.filter((item) => item.how_buy === "munsang").length
              )}
              회
            </Span>
            <Span>
              {addCommas(
                onCalu(
                  charge.filter((item) => item.how_buy === "munsang"),
                  "price"
                )
              )}
              원
            </Span>
          </Div>
        </Div>
        <Div className="Line" />
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
    justify-content: space-between;
    border-bottom: 1px solid #3d3f45;
    align-items: center;
  }
  &.Top {
    display: flex;
    align-items: center;
  }
  &.InfoBox {
    width: 100%;
    padding: 0px 40px;
  }
  &.Buy_firstBar {
    margin-top: 30px;
    display: grid;
    width: 100%;
    grid-template-columns: 22fr 18fr 13fr 13fr 13fr 13fr 13fr;
    text-align: center;
    padding: 20px 40px;
    background-color: #31333a;
  }
  &.Buy_secondBar {
    margin-top: 30px;
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    text-align: center;
    padding: 20px 40px;
    background-color: #31333a;
  }
  &.Charge_Bar {
    margin-top: 30px;
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    text-align: center;
    padding: 20px 40px;
    background-color: #31333a;
  }
  &.Munsang_Bar {
    margin-top: 30px;
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr;
    text-align: center;
    padding: 20px 40px;
    background-color: #31333a;
  }
  &.Buy_firstInfo {
    display: grid;
    width: 100%;
    grid-template-columns: 22fr 18fr 13fr 13fr 13fr 13fr 13fr;
    text-align: center;
    padding: 20px 40px;
  }
  &.Buy_secondInfo {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    text-align: center;

    padding: 20px 40px;
  }
  &.Charge_Info {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    text-align: center;

    padding: 20px 40px;
  }
  &.Munsang_Info {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr;
    text-align: center;
    padding: 20px 40px;
  }
  &.Notice {
    width: 95%;
    height: 50px;
    margin: 24px 40px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    background-color: rgba(181, 224, 229, 0.14);
  }
  &.Line {
    height: 1px;
    width: 100%;
    background-color: #393b44;
    margin-bottom: 5px;
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
    margin-right: 20px;
  }
  &.SubTitle {
    font-size: 22px;
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

const Btn = styled.button`
  width: 150px;
  height: 46px;
  padding: 5px 20px;
  border-radius: 10px;
  background-color: #00abbf;
  margin-left: 10px;
`;
const Img = styled.img`
  margin-right: 10px;
`;
