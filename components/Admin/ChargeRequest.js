import React, { useState } from "react";
import styled from "styled-components";
import { addCommas } from "../../functions/addCommas";
import axios from "axios";
import { useRouter } from "next/router";
import Charge from "../Etc/Charge";
export default function ChargeRequest({ setting }) {
  const router = useRouter();
  const [data, setData] = useState(setting);
  const [modal, setModal] = useState(false);

  const onConfirm = async (index, id, price) => {
    const _data = { index: index, id: id, price: parseInt(price) };
    const response = await axios.post(
      `http://localhost:3000/api/charge_confirm`,
      _data
    );
    if (response.data.exists) {
      router.reload();
    }
  };

  const onReject = async (id) => {
    const response = await axios.post(
      `http://localhost:3000/api/charge_fail?id=${id}`
    );
    if (response.data.exists) {
      router.reload();
    }
  };

  const onAllReject = async (id) => {
    const response = await axios.post(
      `http://localhost:3000/api/charge_fail_all`
    );
    if (response.data.exists) {
      router.reload();
    }
  };
  return (
    <>
      <Div className="Wrapper">
        <Div className="TopBox">
          <Span className="Title">충전요청</Span>
          <Div>
            <Btn className="OtherBtn" onClick={() => setModal(true)}>
              <Span className="BtnText">모두승인</Span>
            </Btn>
            <Btn className="OtherBtn" onClick={onAllReject}>
              <Span className="BtnText">모두거절</Span>
            </Btn>
            <Btn className="ReBtn" onClick={() => router.reload()}>
              <Span className="BtnText">새로고침</Span>
            </Btn>
          </Div>
        </Div>
        <Div className="Line" />
        <Div className="Box">
          <Span className="SubTitle">계좌</Span>
          <Div className="Bar">
            <Span className="BarText">아이디</Span>
            <Span className="BarText">입금자명</Span>
            <Span className="BarText">금액</Span>
            <Span className="BarText" />
          </Div>
          {data.map((item, index) => {
            if (item.how_buy === "bank") {
              return (
                <React.Fragment key={index}>
                  <Div className="Info">
                    <Span>{item.userid}</Span>
                    <Span>{item.bank_name}</Span>
                    <Span>{addCommas(item.price)}원</Span>
                    <Span>
                      <Btn
                        className="OkBtn"
                        onClick={() =>
                          onConfirm(item.id, item.userid, item.price)
                        }
                      >
                        <Span className="BtnText">승인하다</Span>
                      </Btn>
                      <Btn
                        className="RefuseBtn"
                        onClick={() => onReject(item.id)}
                      >
                        <Span className="BtnText">거절하다</Span>
                      </Btn>
                    </Span>
                  </Div>
                  <Div className="Line" />
                </React.Fragment>
              );
            }
          })}
        </Div>
        <Div className="Box">
          <Span className="SubTitle">카카오페이</Span>
          <Div className="Bar">
            <Span className="BarText">아이디</Span>
            <Span className="BarText">송금자명</Span>
            <Span className="BarText">금액</Span>
            <Span className="BarText" />
          </Div>
          {data.map((item, index) => {
            if (item.how_buy === "pay") {
              return (
                <React.Fragment key={index}>
                  <Div className="Info">
                    <Span>{item.userid}</Span>
                    <Span>{item.bank_name}</Span>
                    <Span>{addCommas(item.price)}원</Span>
                    <Span>
                      <Btn
                        className="OkBtn"
                        onClick={() =>
                          onConfirm(item.id, item.userid, item.price)
                        }
                      >
                        <Span className="BtnText">승인하다</Span>
                      </Btn>
                      <Btn
                        className="RefuseBtn"
                        onClick={() => onReject(item.id)}
                      >
                        <Span className="BtnText">거절하다</Span>
                      </Btn>
                    </Span>
                  </Div>
                  <Div className="Line" />
                </React.Fragment>
              );
            }
          })}
        </Div>
        <Div className="Box">
          <Span className="SubTitle">문화상품권</Span>
          <Div className="Bar">
            <Span className="BarText">아이디</Span>
            <Span className="BarText">Pin</Span>
            <Span className="BarText">수수료포함금액</Span>
            <Span className="BarText" />
          </Div>
          {data.map((item, index) => {
            if (item.how_buy === "munsang") {
              return (
                <React.Fragment key={index}>
                  <Div className="Info">
                    <Span>{item.userid}</Span>
                    <Span>{item.price}</Span>
                    <Span></Span>
                    <Span>
                      <Btn
                        className="OkBtn"
                        onClick={() =>
                          onConfirm(item.id, item.userid, item.price)
                        }
                      >
                        <Span className="BtnText">승인하다</Span>
                      </Btn>
                      <Btn
                        className="RefuseBtn"
                        onClick={() => onReject(item.id)}
                      >
                        <Span className="BtnText">거절하다</Span>
                      </Btn>
                    </Span>
                  </Div>
                  <Div className="Line" />
                </React.Fragment>
              );
            }
          })}
        </Div>
      </Div>
      {modal && <Charge setModal={setModal} data={data} />}
    </>
  );
}

const Div = styled.div`
  &.Wrapper {
    width: 100%;
    margin-top: 40px;
    padding-bottom: 15px;
    border-radius: 16px;
    background-color: #272a31;
  }
  &.TopBox {
    width: 100%;
    padding: 25px 40px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #3d3f45;
  }
  &.Box {
    width: 100%;
    padding: 25px 40px;
    display: flex;
    flex-direction: column;
  }
  &.Bar {
    display: grid;
    grid-template-columns: 22fr 22fr 15fr 18fr;
    width: 100%;
    padding: 10px 40px;
    background-color: #31333a;
    margin-top: 20px;
    text-align: center;
  }
  &.Info {
    display: grid;
    grid-template-columns: 22fr 22fr 15fr 18fr;
    padding: 10px 40px;
    background-color: #272a31;
    margin: 5px 0;
    text-align: center;
  }
  &.Line {
    height: 1px;
    width: 100%;
    background-color: #393b44;
  }
`;
const Span = styled.span`
  color: #e5e8ea;
  line-height: 1.56;
  font-weight: normal;
  font-size: 15px;
  align-self: center;
  &.Title {
    font-size: 26px;
    font-weight: bold;
  }
  &.SubTitle {
    font-size: 22px;
    align-self: start;
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

const Input = styled.input``;
const Btn = styled.button`
  &.OtherBtn {
    height: 40px;
    padding: 8px 19px;
    border-radius: 23px;
    background-color: #474950;
    margin-left: 10px;
  }
  &.ReBtn {
    height: 40px;
    padding: 8px 19px;
    border-radius: 23px;
    background-color: #00abbf;
    margin-left: 10px;
  }
  &.OkBtn {
    height: 40px;
    padding: 8px 14px;
    border-radius: 10px;
    background-color: #00abbf;
  }
  &.RefuseBtn {
    height: 40px;
    padding: 8px 14px;
    border-radius: 10px;
    background-color: #f34a7e;
    margin-left: 10px;
  }
`;

const Img = styled.img``;
