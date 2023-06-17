import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import IdError from "../Etc/IdError";
import Check from "../Etc/Check";
export default function Login({ setLogin, setUser, data }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [modal, setModal] = useState({
    open: false,
    text: "",
  });
  const [error, setError] = useState(false);

  const onLogin = async () => {
    if (id.trim() === "") {
      setModal({ open: true, text: "아이디 에러" });
    } else if (pw.trim() === "") {
      setModal({ open: true, text: "비밀번호 에러" });
    } else if (id.trim().length < 6 || pw.trim().length < 6) {
      setError(true);
    } else {
      const response = await axios.post("/api/login", {
        id,
        pw,
      });
      if (response.data.exists) {
        setLogin(true);
        setUser(response.data.user);
      } else {
        setError(true);
      }
    }
  };

  return (
    <Div className="Main" bg={data.setting.login_back_url}>
      <Div className="Wrapper">
        <Div className="Box">
          <Div className="Top">
            <Div className="Login">
              <Span className="Title">로그인</Span>
            </Div>
            <Div className="empty" />
          </Div>
          <Input
            placeholder="아이디 (6자 이상)"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Input
            placeholder="비밀번호 입력"
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          <Btn className="Login" onClick={onLogin}>
            <Span>로그인</Span>
          </Btn>
          <a href="/join">
            <Btn className="Join">
              <Span>회원가입</Span>
            </Btn>
          </a>
        </Div>
      </Div>
      {modal.open && <IdError setModal={setModal} text={modal.text} />}
      {error && <Check setModal={setError} />}
    </Div>
  );
}

const Div = styled.div`
  &.Main {
    width: 100%;
    height: 100vh;
    ${(props) =>
      props.bg === ""
        ? `background-image: url("/assets/images/green.png"),
    url("/assets/images/white.png"), url("/assets/images/blue.png");
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-size: auto, contain, auto;
  background-position: top left, bottom left, bottom right;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1b1e24;`
        : `background-image: url(${props.bg});
background-repeat: no-repeat;
background-size: cover;
display: flex;
align-items: center;
justify-content: center;
background-color: #1b1e24;`}
  }
  &.Wrapper {
    width: 482px;
  }
  &.Top {
    display: flex;
  }
  &.Login {
    border: 1px solid #f34a7e;
    border-radius: 8px 8px 0 0;
    border-bottom: none;
    display: flex;
    text-align: center;
    padding: 13px 50px;
    width: 200px;
  }
  &.empty {
    width: 100%;
    border-bottom: 1px solid #f34a7e;
  }
`;
const Span = styled.span`
  color: #e5e8ea;
  line-height: 1.56;
  font-weight: bold;
  font-size: 18px;

  &.Title {
    font-size: 24px;
    font-weight: bold;
  }
`;
const Input = styled.input`
  width: 100%;
  height: 46px;
  border: none;
  border-bottom: solid 1px #ffb9cf;
  font-size: 18px;
  font-weight: normal;
  line-height: 1.73;
  background-color: transparent;
  color: #e5e8ea;
  margin: 18px 0;
  outline: none;
`;
const Btn = styled.button`
  &.Login {
    width: 100%;
    height: 60px;
    border-radius: 16px;
    background-color: #f34a7e;
    margin-top: 16px;
  }
  &.Join {
    width: 100%;
    height: 60px;
    border-radius: 16px;
    background-color: #363c69;
    margin-top: 16px;
  }
`;

const Img = styled.img``;
