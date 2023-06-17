import styled from "styled-components";

export default function NoticePopup({ setModal }) {
  return (
    <Div className="ModalBox">
      <Div className="ModalContent">
        <Div className="Top">
          <Div className="CloseIcon">
            <Img src="/assets/images/icon-close-white.png" />
          </Div>
        </Div>
        <Span>
          긴급공지 팝업입니다. 긴급공지 팝업입니다. 긴급공지 팝업입니다.
          긴급공지 팝업입니다. 긴급공지 팝업입니다. 긴급공지 팝업입니다.
        </Span>
        <Div className="BottomText">
          <Div className="Off" />{" "}
          <Span className="Check">하루동안 팝업 열지 않기</Span>
          {/* <Div className="On">
                        <Img src="/assets/images/icon-checkwhite-16.png" />
                    </Div> */}
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
    width: 640px;
    height: 320px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    background-color: #272a31;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    padding: 30px;
  }
  &.CloseIcon {
    width: 32px;
    height: 32px;
    padding: 8px;
    border-radius: 50%;
    background-color: #32333a;
    cursor: pointer;
    text-align: end;
  }
  &.On {
    curosr: pointer;
    width: 24px;
    height: 24px;
    margin: 32px 12px 0 0;
    padding: 4px;
    border-radius: 6px;
    background-color: #1fa58c;
  }
  &.Off {
    cursor: pointer;
    width: 24px;
    height: 24px;
    margin-right: 12px;
    border-radius: 6px;
    border: solid 1.5px #575a63;
  }
  &.Top {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  &.BottomText {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;

const Span = styled.span`
  font-size: 22px;
  font-weight: normal;
  color: #e5e8ea;
  &.Check {
    font-size: 15px;
    font-weight: normal;
  }
`;

const Img = styled.img`
  &.Wallet {
    width: 110px;
    height: 110px;
  }
`;
