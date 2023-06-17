import styled from "styled-components";

export default function IdError({ setModal, text }) {
  return (
    <Div
      className="ModalBox"
      onClick={() => setModal({ oepn: false, text: "" })}
    >
      <Div className="ModalContent">
        <Div className="Top">
          <Div
            className="CloseIcon"
            onClick={() => setModal({ oepn: false, text: "" })}
          >
            <Img src="/assets/images/icon-close-white.png" />
          </Div>
        </Div>
        <Div className="Bottom">
          <Img src="/assets/images/icon-login-110.png" className="Wallet" />
          <Span>{text}</Span>
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
    width: 400px;
    height: 264px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.8);
    border-style: solid;
    border-width: 2px;
    border-image-source: linear-gradient(to bottom, #fe81a7 -22%, #5c68b7 79%);
    border-image-slice: 1;
    background-image: linear-gradient(to bottom, #272a31, #272a31),
      linear-gradient(to bottom, #fe81a7 -22%, #5c68b7 79%);
    background-origin: border-box;
    background-clip: content-box, border-box;
  }
  &.Top {
    width: 100%;
    padding: 25px 25px 0;
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
  font-size: 20px;
  font-weight: normal;
  color: #e5e8ea;
  margin-bottom: 60px;
`;

const Img = styled.img`
  &.Wallet {
    width: 110px;
    height: 110px;
  }
`;
