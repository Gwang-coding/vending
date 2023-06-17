import styled from "styled-components";

export default function Check({ setModal }) {
  return (
    <Div className="ModalBox" onClick={() => setModal(false)}>
      <Div className="ModalContent">
        <Div className="Top">
          <Div className="CloseIcon" onClick={() => setModal(false)}>
            <Img src="/assets/images/icon-close-white.png" />
          </Div>
        </Div>
        <Div className="Bottom">
          <Img src="/assets/images/icon-idpw-110.png" className="Wallet" />
          <Span>
            아이디 또는 비밀번호가 <br /> 일치하지않습니다
          </Span>
        </Div>
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
    cursor: pointer;
  }
  &.Bottom {
    height: 100%;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
  }
`;

const Span = styled.span`
  font-size: 22px;
  font-weight: normal;
  color: #e5e8ea;
  margin-bottom: 40px;
`;

const Img = styled.img`
  &.Wallet {
    width: 110px;
    height: 110px;
  }
`;
