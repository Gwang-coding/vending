import styled from "styled-components";

export default function PurchasePopUp() {
  return (
    <Div className="ModalBox">
      <Div className="ModalContent">
        <Div className="Top">
          <Div className="TopTitle">
            <Span className="Title">구매하기</Span>
          </Div>
          <Div className="CloseIcon">
            <Img src="/assets/images/icon-close-white.png" />
          </Div>
        </Div>
        <Div className="Bottom">
          <Div className="BottomBox">
            <Span className="Title">[우디르]12시간</Span>
          </Div>
          <Div className="BottomBox">
            <Span>가격</Span>
            <Div className="Input">
              <Span className="Inven">13,000</Span>
              <Span className="Count">원</Span>
            </Div>
          </Div>
          <Div className="BottomBox">
            <Span>남은 재고 수</Span>
            <Div className="Input">
              <Span className="Inven">1개</Span>
            </Div>
          </Div>
          <Div className="BottomBox">
            <Span>구매수량</Span>
            <Div>
              <Input />
              <Span className="Count">/100개</Span>
            </Div>
          </Div>
          <Div className="Line" />
        </Div>
        <Div className="BtnBox">
          <Btn className="Cancle">
            <Span className="BtnText">취소</Span>
          </Btn>
          <Btn className="Buy">
            <Span className="BtnText">구매</Span>
          </Btn>
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
    width: 360px;
    height: 506px;
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
  }
  &.Bottom {
    width: 100%;
    padding: 20px 30px 0;
  }
  &.BottomBox {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  &.Input {
    width: 120px;
    height: 52px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    border: solid 1px #3d3f45;
    background-color: #272a31;
    justify-content: space-between;
    padding: 0px 15px;
  }
  &.BtnBox {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0px 30px;
    margin-top: 20px;
  }
  &.Line {
    width: 100%;
    height: 1px;
    background-color: #393b44;
  }
`;

const Span = styled.span`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.56;
  color: #e5e8ea;
  &.Title {
    font-size: 22px;
    font-weight: bold;
  }
  &.BtnText {
    font-size: 18px;
    font-weight: bold;
  }
  &.Inven {
    font-size: 15px;
    font-weight: normal;
  }
  &.Count {
    font-size: 15px;
    font-weight: normal;
    color: #7a7c85;
    margin-left: 12px;
  }
`;
const Input = styled.input`
  border-radius: 10px;
  border: solid 1px #3d3f45;
  background-color: #31333a;
  height: 52px;
  width: 62px;
  font-size: 15px;
  color: #e5e8ea;
  outline: none;
  padding-left: 12px;
`;
const Btn = styled.button`
  &.Cancle {
    padding: 16px 54px;
    border-radius: 35px;
    background-color: #31333a;
  }
  &.Buy {
    padding: 16px 54px;
    border-radius: 35px;
    background-color: #1fa58c;
  }
`;

const Img = styled.img``;
