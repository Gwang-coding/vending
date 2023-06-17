import styled from "styled-components";
import { useState } from "react";
import BankPopUp from "./KakaoQR";
import { converDate } from "../../functions/converDate";
import axios from "axios";
import { addCommas } from "../../functions/addCommas";
export default function Kakaopay({ setModal, user, setState, data }) {
  const [name, setName] = useState(user.bank_name);
  const [money, setMoney] = useState("");
  const [next, setNext] = useState(false);

  const onCharge = async () => {
    const _data = {
      date: converDate(new Date()),
      id: user.id,
      bank_name: name,
      how_buy: "pay",
      result: "wait",
      price: money,
      ip: user.join_ip,
      action: "충전신청",
      memo: `카카오페이 ${addCommas(money)}원 충전신청`,
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
      setNext(true);
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
                  <Div
                    className="CheckedOval"
                    onClick={() => setState("pay")}
                  />
                  <Span onClick={() => setState("pay")}>카카오페이 송금</Span>
                </CDiv>
              )}
              {data.setting.munsang === "1" && (
                <CDiv>
                  <Div className="Oval" onClick={() => setState("munsang")} />
                  <Span onClick={() => setState("munsang")}>
                    문화 상품권 충전
                  </Span>
                </CDiv>
              )}
            </Div>
          </Div>
          <Div className="Line" />
          <Div className="Box">
            <Span className="SubTitle">입금자명</Span>
            <Div className="Input">
              <Input
                value={name}
                onChange={(e) =>
                  user.bank_name.length === 0 && setName(e.target.value)
                }
              />
            </Div>
          </Div>
          <Div className="Line" />
          <Div className="Box">
            <Span className="SubTitle">입금할 금액</Span>
            <Div className="Input">
              <Input
                type="number"
                value={money}
                onChange={(e) => setMoney(e.target.value)}
              />
              <Span className="Info">원</Span>
            </Div>
          </Div>
          <Div className="Line" />
          <Div className="Notice">
            <Img className="NoticeIcon" src="/assets/images/icon-info-16.png" />
            <Span className="Warning">주의사항</Span>
          </Div>
          <Div className="Notice">
            <Img className="NoticeIcon" src="/assets/images/icon-bullet.png" />
            <Span className="Info">
              송금자명은 한번 지정시 변경이 불가능 합니다.
            </Span>
          </Div>
          <Div className="Notice">
            <Img className="NoticeIcon" src="/assets/images/icon-bullet.png" />
            <Span className="Info">[친구에게 송금]하시면 안됩니다.</Span>
          </Div>
          <Div className="Notice">
            <Img className="NoticeIcon" src="/assets/images/icon-bullet.png" />
            <Span className="Info">
              [받는 분 이름표시]에 꼭 송금자명 맞춰서 송금해야합니다.
            </Span>
          </Div>
          <Div className="Notice">
            <Img className="NoticeIcon" src="/assets/images/icon-bullet.png" />
            <Span className="Info">
              5분동안 입금확인이 되지 않을 경우 취소처리 됩니다.
            </Span>
          </Div>
          <Div className="Notice">
            <Img className="NoticeIcon" src="/assets/images/icon-bullet.png" />
            <Span className="Info">
              입금 신청을 잘못하신 경우 5분후 다시 시도해주세요.
            </Span>
          </Div>
        </Div>
        <Btn onClick={onCharge}>
          <Span className="BtnText">충전하기</Span>
        </Btn>
      </Div>
      {next && <BankPopUp setModal={setModal} data={data} />}
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
    padding: 30px 30px 0;
  }
  &.CheckText {
    display: flex;
    width: 73%;
    align-items: center;
    justify-content: start;
  }
  &.CheckBox {
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &.Box {
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &.CheckedOval {
    width: 20px;
    height: 20px;
    border: solid 6px #25b499;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 20px;
  }
  &.Oval {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: solid 1px #e5e8ea;
    margin-right: 20px;
    cursor: pointer;
  }
  &.Input {
    width: 180px;
    border-radius: 10px;
    border: solid 1px #3d3f45;
    background-color: #31333a;
    padding: 0px 10px;
  }
  &.Notice {
    display: flex;
    align-items: center;
    margin: 5px 0;
  }
  &.Line {
    margin: 25px 0;
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
  border: none;
  background-color: transparent;
  height: 52px;
  width: 140px;
  font-size: 18px;
  color: #e5e8ea;
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
