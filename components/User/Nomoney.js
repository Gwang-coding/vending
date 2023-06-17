import styled from "styled-components";

export default function Nomoney() {
  return (
    <Div className="ModalBox">
      <Div className="ModalContent">
        <Div className="Top">
          <Div className="CloseIcon">
            <Img src="/assets/images/icon-close-white.png" />
          </Div>
        </Div>
        <Div className="Bottom">
          <Img src="/assets/images/icon-wallet.png" className="Wallet" />
          <Span>
            보유금액이 부족합니다
            <br />
            금액을 충전해주세요
          </Span>
        </Div>
      </Div>
    </Div>
  );
}

const Div = styled.div`
  &.ModalBox {
    // position: fixed;
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
    width: 480px;
    height: 320px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    background-color: #272a31;
    padding: 30px 0px;
  }
  &.Top {
    width: 100%;
    padding: 0px 25px;
    display: flex;
    justify-content: flex-end;
  }
  &.CloseIcon {
    width: 32px;
    height: 32px;
    padding: 8px;
    border-radius: 50%;
    background-color: #32333a;
  }
  &.Bottom {
    margin-top: 15px;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;

const Span = styled.span`
  font-size: 22px;
  font-weight: normal;
  margin-top: 10px;
  color: #e5e8ea;
`;
const Input = styled.input``;
const Btn = styled.button``;

const Img = styled.img`
  &.Wallet {
    width: 110px;
    height: 110px;
  }
`;
