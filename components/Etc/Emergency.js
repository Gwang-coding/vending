import styled from "styled-components";

export default function Emergency({ setModal }) {
  return (
    <Div className="ModalBox">
      <Div className="ModalContent">
        <Div className="Wrapper">
          <Div className="ImgBox" />
          <Span>
            안녕하세요 00입니다. <br />
            미승인 멘트입니다. <br /> 미승인 멘트입니다.미승인 멘트입니다.미승인
            멘트입니다.미승인 멘트입니다.미승인 멘트입니다.미승인
            멘트입니다.미승인 멘트입니다. <br />
            미승인 멘트입니다.미승인 멘트입니다. 미승인 멘트입니다.미승인
            멘트입니다.미승인 멘트입니다.미승인 멘트입니다.미승인
            멘트입니다.미승인 멘트입니다.미승인 멘트입니다.미승인
            멘트입니다.미승인 멘트입니다.미승인 멘트입니다. 미승인 멘트입니다.{" "}
            <br />
            미승인 멘트입니다.미승인 멘트입니다.미승인 멘트입니다. 미승인
            멘트입니다.미승인 멘트입니다.미승인 멘트입니다.미승인 멘트입니다.
          </Span>
          <Div className="Call">
            <Img src="/assets/images/icon-call-24.png" />
            <Span className="Telegram">텔레그램 고객센터 : sfzdcx</Span>
          </Div>
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
    width: 730px;
    height: 867px;
    border-radius: 16px;
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
  &.Wrapper {
    width: 100%;
    height: 100%;
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  &.ImgBox {
    width: 260px;
    height: 260px;
    margin: 0 185px 40px 156px;
    background-color: #d8d8d8;
  }
  &.Call {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 15px;
  }
`;

const Span = styled.span`
  font-size: 18px;
  font-weight: normal;
  line-height: 1.78;
  color: #e5e8ea;
  &.Telegram {
    font-weight: bold;
    margin-left: 10px;
  }
`;

const Img = styled.img``;
