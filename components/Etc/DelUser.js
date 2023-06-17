import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
export default function DelUser({ setModal }) {
  const router = useRouter();
  const onDel = async () => {
    await axios.post("/api/user_list_del_all");
    setModal(false);
    router.reload();
  };
  return (
    <Div className="ModalBox" onClick={() => setModal(false)}>
      <Div className="ModalContent">
        <Div className="Top">
          <Div className="CloseIcon">
            <Img src="/assets/images/icon-close-white.png" />
          </Div>
        </Div>
        <Div className="Bottom">
          <Img src="/assets/images/icon-user-110.png" className="Wallet" />
          <Span>비구매자 삭제를 하시겠습니까?</Span>
          <Div className="BtnBox">
            <Btn className="No">아니요</Btn>
            <Btn className="Yes" onClick={onDel}>
              확인
            </Btn>
          </Div>
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
  &.BtnBox {
    width: 100%;
    display: flex;
    justify-content: center;
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
    }
`;
const Input = styled.input``;
const Btn = styled.button`
  &.Yes {
    width: 120px;
    height: 46px;
    border-radius: 23px;
    background-color: #1fa58c;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    margin: 0 5px;
  }
  &.No {
    width: 120px;
    height: 46px;
    border-radius: 23px;
    background-color: #474950;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    margin: 0 5px;
  }
`;

const Img = styled.img`
  &.Wallet {
    width: 110px;
    height: 110px;
  }
`;
