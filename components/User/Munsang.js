import { useState } from "react";
import styled from "styled-components";
import { converDate } from "../../functions/converDate";
import axios from "axios";
import { addCommas } from "../../functions/addCommas";
export default function Munsang({ setModal, user, setState, data }) {
  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");
  const [pin5, setPin5] = useState("");
  const [pin6, setPin6] = useState("");
  const [pin7, setPin7] = useState("");
  const [pin8, setPin8] = useState("");
  const [pin9, setPin9] = useState("");
  const [pin10, setPin10] = useState("");
  const [pin11, setPin11] = useState("");
  const [pin12, setPin12] = useState("");

  const onCharge = async () => {
    const _pin = `${pin1}-${pin2}-${pin3}-${pin4} ${pin5}-${pin6}-${pin7}-${pin8} ${pin9}-${pin10}-${pin11}-${pin12}`;
    const _data = {
      date: converDate(new Date()),
      id: user.id,
      bank_name: user.bank_name,
      how_buy: "munsang",
      result: "wait",
      price: _pin,
      ip: user.join_ip,
      action: "충전신청",
      memo: `문화상품권 충전신청`,
    };
    const res = await axios.post(
      "http://localhost:3000/api/user/charge_write",
      _data
    );
    const res2 = await axios.post(
      "http://localhost:3000/api/user/log_write",
      _data
    );
    if (res.data.exists && res2.data.exists) {
      setModal(false);
    }
  };
  return (
    <Div className="ModalBox">
      <Div className="ModalContent">
        <Div className="Top">
          <Div className="TopTitle">
            <Span className="Title">결제</Span>
          </Div>
          <Div className="CloseIcon" onClick={() => setModal(false)}>
            <Img src="/assets/images/icon-close-white.png" />
          </Div>
        </Div>
        <Div className="Bottom">
          <Div className="CheckBox">
            <Span className="SubTitle">결제 방식</Span>
            <Div className="CheckText">
              {data.setting.bank === "1" && (
                <CDiv>
                  <Div className="Oval" onClick={() => setState("bank")} />
                  <Span onClick={() => setState("bank")}>계좌이체</Span>
                </CDiv>
              )}
              {data.setting.pay === "1" && (
                <CDiv>
                  <Div className="Oval" onClick={() => setState("pay")} />
                  <Span onClick={() => setState("pay")}>카카오페이 송금</Span>
                </CDiv>
              )}
              {data.setting.munsang === "1" && (
                <CDiv>
                  <Div
                    className="CheckedOval"
                    onClick={() => setState("munsang")}
                  />
                  <Span onClick={() => setState("munsang")}>
                    문화 상품권 충전
                  </Span>
                </CDiv>
              )}
            </Div>
          </Div>
          <Div className="Line" />
          <Div className="BottomBox">
            <Span className="SubTitle">문화 상품권 번호</Span>
            <Div className="Input">
              <Input
                placeholder="4자리"
                type="text"
                maxLength={4}
                value={pin1}
                onChange={(e) => setPin1(e.target.value.replace(/[^0-9]/g, ""))}
              />
              <Input
                placeholder="4자리"
                type="text"
                maxLength={4}
                value={pin2}
                onChange={(e) => setPin2(e.target.value.replace(/[^0-9]/g, ""))}
              />
              <Input
                placeholder="4자리"
                type="text"
                maxLength={4}
                value={pin3}
                onChange={(e) => setPin3(e.target.value.replace(/[^0-9]/g, ""))}
              />
              <Input
                placeholder="4자리"
                type="text"
                maxLength={4}
                value={pin4}
                onChange={(e) => setPin4(e.target.value.replace(/[^0-9]/g, ""))}
              />
              <Input
                placeholder="4자리"
                type="text"
                maxLength={4}
                value={pin5}
                onChange={(e) => setPin5(e.target.value.replace(/[^0-9]/g, ""))}
              />
              <Input
                placeholder="4자리"
                type="text"
                maxLength={4}
                value={pin6}
                onChange={(e) => setPin6(e.target.value.replace(/[^0-9]/g, ""))}
              />
              <Input
                placeholder="4자리"
                type="text"
                maxLength={4}
                value={pin7}
                onChange={(e) => setPin7(e.target.value.replace(/[^0-9]/g, ""))}
              />
              <Input
                placeholder="4자리"
                type="text"
                maxLength={4}
                value={pin8}
                onChange={(e) => setPin8(e.target.value.replace(/[^0-9]/g, ""))}
              />
              <Input
                placeholder="4자리"
                type="text"
                maxLength={4}
                value={pin9}
                onChange={(e) => setPin9(e.target.value.replace(/[^0-9]/g, ""))}
              />
              <Input
                placeholder="4자리"
                type="text"
                maxLength={4}
                value={pin10}
                onChange={(e) =>
                  setPin10(e.target.value.replace(/[^0-9]/g, ""))
                }
              />
              <Input
                placeholder="4자리"
                type="text"
                maxLength={4}
                value={pin11}
                onChange={(e) =>
                  setPin11(e.target.value.replace(/[^0-9]/g, ""))
                }
              />
              <Input
                placeholder="4자리"
                type="text"
                maxLength={4}
                value={pin12}
                onChange={(e) =>
                  setPin12(e.target.value.replace(/[^0-9]/g, ""))
                }
              />
            </Div>
          </Div>
          <Div className="Line" />
          <Div className="Notice">
            <Img className="NoticeIcon" src="/assets/images/icon-info-16.png" />
            <Span className="Warning">주의사항</Span>
          </Div>
          <Div className="Notice">
            <Img className="NoticeIcon" src="/assets/images/icon-bullet.png" />
            <Span className="Info">문화상품권 충전 수수료는 10%입니다.</Span>
          </Div>
          <Div className="Notice">
            <Img className="NoticeIcon" src="/assets/images/icon-bullet.png" />
            <Span className="Info">
              문화상품권 핀번호가 정확하다면 1분내로 충전됩니다.
            </Span>
          </Div>
          <Div className="Notice">
            <Img className="NoticeIcon" src="/assets/images/icon-bullet.png" />
            <Span className="Info">
              충전 오류가 있을 시 관리자에게 문의 주세요.
            </Span>
          </Div>
        </Div>
        <Btn onClick={onCharge}>
          <Span className="BtnText">충전하기</Span>
        </Btn>
      </Div>
    </Div>
  );
}

const Div = styled.div`
  &.ModalBox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.ModalContent {
    align-items: center;
    width: 900px;
    height: 680px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #272a31;
    padding: 30px 0px;
  }
  &.Top {
    width: 100%;
    padding: 0px 25px 30px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #3d3f45;
  }
  &.TopTitle {
    padding-left: 15px;
    heigth: 40px;
    border-left: 4px solid #25b499;
  }
  &.CloseIcon {
    width: 32px;
    height: 32px;
    padding: 8px;
    border-radius: 50%;
    background-color: #32333a;
    cursor: pointer;
  }
  &.Bottom {
    width: 100%;
    padding: 20px 30px 0;
  }
  &.CheckBox {
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &.CheckText {
    display: flex;
    width: 73%;
    align-items: center;
    justify-content: start;
  }
  &.BottomBox {
    width: 94%;
    display: flex;
    justify-content: space-between;
  }
  &.Input {
    height: 160px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    row-gap: 10px;
    column-gap: 10px;
    margin-bottom: 10px;
    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  &.CheckedOval {
    width: 20px;
    height: 20px;
    border: solid 6px #25b499;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 10px;
  }
  &.Oval {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: solid 1px #e5e8ea;
    margin-right: 10px;
    cursor: pointer;
  }
  &.Notice {
    display: flex;
    align-items: center;
    margin: 5px 0;
  }
  &.Line {
    margin: 30px 0;
    height: 1px;
    width: 100%;
    background-color: #3d3f45;
  }
`;

const Span = styled.span`
  font-size: 15px;
  font-weight: normal;
  line-height: 1.6;
  color: #e5e8ea;

  &.Title {
    font-size: 22px;
    font-weight: bold;
  }
  &.SubTitle {
    font-size: 18px;
    font-weight: 500;
  }
  &.Warning {
    font-weight: 500;
  }
  &.Info {
    font-size: 15px;
    font-weight: 500;
    color: #7a7c85;
  }
  &.BtnText {
    font-size: 18px;
    font-weight: bold;
  }
`;
const Input = styled.input`
  border: solid 1px #3d3f45;
  background-color: #31333a;
  height: 52px;
  width: 150px;
  font-size: 18px;
  color: #e5e8ea;
  border-radius: 10px;
  padding: 10px;
  outline: none;
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const Btn = styled.button`
  padding: 16px 84px;
  border-radius: 35px;
  background-color: #1fa58c;
  margin-top: 20px;
`;

const Img = styled.img`
  &.NoticeIcon {
    margin-right: 10px;
  }
`;

const CDiv = styled.div`
  margin-right: 20px;
  display: flex;
  align-items: center;
`;
