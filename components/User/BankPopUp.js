import styled from "styled-components";

export default function BankPopUp({ setModal, data }) {
  return (
    <Div className="ModalBox">
      <Div className="ModalContent">
        <Div className="Top">
          <Div className="TopTitle">
            <Span className="Title">결제</Span>
          </Div>
          <Div
            className="CloseIcon"
            onClick={() => {
              setModal(false);
            }}
          >
            <Img src="/assets/images/icon-close-white.png" />
          </Div>
        </Div>
        <Div className="Bottom">
          <Div className="BottomBox">
            <Span>
              아래 계좌로 입금후 확인버튼을 눌러주시면 신청이 완료됩니다.
            </Span>
          </Div>
          <Div className="BottomBox">
            <Span className="SubTitle">은행</Span>
            <Input value={data.setting.bank_bank} readOnly />
          </Div>
          <Div className="BottomBox">
            <Span className="SubTitle">계좌번호</Span>
            <Input value={data.setting.bank_accout} readOnly />
          </Div>
          <Div className="BottomBox">
            <Span className="SubTitle">예금주</Span>
            <Input value={data.setting.bank_name} readOnly />
          </Div>
          <Div className="Line" />
          <Div className="Notice">
            <Img className="NoticeIcon" src="/assets/images/icon-info-16.png" />
            <Span className="Warning">주의사항</Span>
          </Div>
          <Div className="Notice">
            <Img className="NoticeIcon" src="/assets/images/icon-bullet.png" />
            <Span className="Info">
              꼭 계좌번호를 확인후 이체가 완료되면 확인버튼을 눌러주세요.
            </Span>
          </Div>
          <Div className="Notice">
            <Img className="NoticeIcon" src="/assets/images/icon-bullet.png" />
            <Span className="Info">
              확인 버튼을 누를 시 계좌번호를 다시 할인할 수 없습니다.
            </Span>
          </Div>
        </Div>

        <Btn onClick={() => setModal(false)}>
          <Span className="BtnText">확인</Span>
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
        cursor: pointer
    }
    &.Bottom {
        width: 100%;
        padding: 0px 30px;
    }
    &.BottomBox {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content:space-between;
        padding-bottom: 30px;
    }
    &.Notice {
        display: flex;
        align-items: center;
        margin: 5px 0;
    }
    &.Line {
        width: 100%;
        height: 1px;
        background-color: #393b44;
        margin 10px 0 30px;
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
  width: 300px;
  height: 52px;
  border-radius: 10px;
  border: solid 1px #3d3f45;
  background-color: #31333a;
  font-size: 18px;
  color: #e5e8ea;
  outline: none;
  padding-left: 10px;
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
