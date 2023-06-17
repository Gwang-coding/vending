import styled from "styled-components";
import { useQRCode } from "next-qrcode";
export default function KakaoQR({ setModal, data }) {
  const { Canvas } = useQRCode();
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
          <Span>
            신청이 완료되었습니다
            <br />
            QR코드를 통해 송금후 완료 버튼을 눌러주세요
          </Span>
        </Div>
        <Div className="Rectangle">
          <Canvas
            text={data.setting.pay_url}
            options={{
              level: "M",
              margin: 3,
              scale: 3,
              width: 180,
              
            }}
          />
          {/* <Img src="/assets/images/QR.png" /> */}
        </Div>
        <Span className="Info">
          <a href={data.setting.pay_url} target="_blank">
            모바일인가요? 여기를 눌러 카카오톡으로 이동하세요.
          </a>
        </Span>
        <Btn
          onClick={() => {
            setModal(false);
          }}
        >
          <Span className="BtnText">완료</Span>
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
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    background-color: #32333a;
  }
  &.Bottom {
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    padding: 20px 30px 0;
  }
  &.Rectangle {
    width: 180px;
    height: 180px;
    margin: 30px 0;
    border-radius: 20px;
    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.8);
    background-color: #fff;
  }
`;

const Span = styled.span`
  font-size: 28px;
  font-weight: 500;
  line-height: 1.6;
  color: #e5e8ea;

  &.Title {
    font-size: 22px;
    font-weight: bold;
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
const Input = styled.input``;
const Btn = styled.button`
  padding: 16px 84px;
  border-radius: 35px;
  background-color: #1fa58c;
  margin-top: 20px;
`;

const Img = styled.img``;
