import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
export default function Charge({ setModal, data }) {
  const router = useRouter();
  const onAllConfirm = async (id) => {
    const response = await axios.post(
      `http://localhost:3000/api/charge_confirm_all`,
      data
    );
    if (response.data.exists) {
      setModal(false);
      router.reload();
    }
  };

  return (
    <Div className="ModalBox">
      <Div className="ModalContent">
        <Div className="Bottom">
          <Span>모든 충전요청을 승인하겠습니까?</Span>
          <Div className="BtnBox">
            <Btn className="No" onClick={() => setModal(false)}>
              아니요
            </Btn>
            <Btn className="Yes" onClick={onAllConfirm}>
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
    padding: 100px 0px;
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

const Img = styled.img``;
