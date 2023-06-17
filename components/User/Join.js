import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import IdError from "../Etc/IdError";
import { todayDate } from "../../functions/todayDate";
import SuccessJoin from "../Etc/SuccessJoin";
import { converDate } from "../../functions/converDate";
export default function Join() {
  const [id, setId] = useState("");
  const [idc, setIdc] = useState(false);
  const [pw, setPw] = useState("");
  const [pwc, setPwc] = useState("");
  const [modal, setModal] = useState({
    open: false,
    text: "",
  }); //중복모달
  const [jmodal, setJmodal] = useState(false);

  //회원가입
  const onJoin = async () => {
    const myip = await axios.get("/api/getip").then((res) => {
      return res.data.ip;
    });
    if (id.trim() === "") {
      //아이디 비어있으면
      setModal({ open: true, text: "아이디 에러" });
    } else if (pw.trim() === "") {
      setModal({ open: true, text: "비밀번호 에러" });
    } else if (pwc.trim() === "") {
      setModal({ open: true, text: "비밀번호 에러" });
    } else if (pw.trim() === id.trim()) {
      //비번
      setModal({ open: true, text: "아이디 에러" });
    } else if (pw.trim() !== pwc.trim()) {
      //비밀번호 비번확인
      setModal({ open: true, text: "비밀번호 에러" });
    } else if (!idc) {
      setModal({ open: true, text: "중복확인 에러" });
    } else {
      const response = await axios.post("http://localhost:3000/api/join", {
        id: id,
        pw: pw,
        join_date: converDate(new Date()),
        join_ip: myip,
      });
      if (response.data.exists) {
        setJmodal(true);
      }
    }
  };
  //중복확인
  const onIdc = async () => {
    try {
      if (id.trim() === "") {
        setModal({ open: true, text: "아이디 에러" });
      } else if (id.trim().length < 6) {
        setModal({ open: true, text: "아이디 에러" });
      } else {
        const _data = { id: id };
        const response = await axios.post(
          "http://localhost:3000/api/idc",
          _data
        );
        if (response.data.exists) {
          //중복
          setModal({ open: true, text: "아이디 중복" });
        } else {
          //사용가능
          setIdc(true);
        }
      }
    } catch (error) {
      alert("에러");
      // 오류 처리
    }
  };
  return (
    <>
      <Div className="Main">
        <Div className="Wrapper">
          <Span className="Title">회원가입</Span>
          <Div className="Middle">
            <Div className="Box">
              <Span>
                아이디<Span className="PointText">*</Span>
              </Span>
              <Div className="ID">
                <Input
                  placeholder="아이디 (6자 이상)"
                  value={id}
                  onChange={(e) => {
                    setId(e.target.value);
                    setIdc(false);
                  }}
                />
                <Btn className="Check">
                  <Span className="BtnText" onClick={onIdc}>
                    중복확인
                  </Span>
                </Btn>
              </Div>
            </Div>
            <Div className="Box">
              <Span>
                비밀번호<Span className="PointText">*</Span>
              </Span>
              <Div className="ID">
                <Input
                  type="password"
                  placeholder="비밀번호 (6자 이상)"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                />
              </Div>
            </Div>
            <Div className="Box">
              <Span>
                비밀번호 확인<Span className="PointText">*</Span>
              </Span>
              <Div className="ID">
                <Input
                  type="password"
                  placeholder="비밀번호 확인을 위해 한번 더 입력해주세요"
                  value={pwc}
                  onChange={(e) => setPwc(e.target.value)}
                />
              </Div>
            </Div>
          </Div>
          <Span className="Login">
            이미 계정이 있으신가요?{" "}
            <a href="/">
              <Span className="PointText">로그인</Span>
            </a>
          </Span>
          <Btn className="Join" onClick={onJoin}>
            <Span className="BtnText">회원가입</Span>
          </Btn>
        </Div>
      </Div>
      {modal.open && <IdError setModal={setModal} text={modal.text} />}
      {jmodal && <SuccessJoin />}
    </>
  );
}

const Div = styled.div`
  &.Main {
    width: 100%;
    height: 100vh;
    background-image: url("/assets/images/green.png"),
      url("/assets/images/white.png"), url("/assets/images/blue.png");
    background-repeat: no-repeat, no-repeat, no-repeat;
    background-size: auto, contain, auto;
    background-position: top left, bottom left, bottom right;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1b1e24;
  }
  &.Wrapper {
    width: 750px;
    height: 660px;
    padding: 40px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(17, 17, 17, 0.5);
    border-radius: 16px;
  }
  &.Middle {
    height: 75%;
    width: 100%;
    margin: 30px 0;
    border-top: 1px solid #3d3f45;
    border-bottom: 1px solid #3d3f45;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 50px 0px;
  }
  &.Box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &.ID {
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px #3d3f45;
    width: 80%;
    align-items: end;
    padding: 10px 0;
  }
`;
const Span = styled.span`
  color: #e5e8ea;
  line-height: 1.56;
  font-weight: normal;
  font-size: 18px;

  &.Title {
    font-size: 24px;
    font-weight: bold;
  }
  &.Login {
    font-size: 15px;
    font-weight: 500;
  }
  &.PointText {
    margin-left: 10px;
    color: #ff709c;
    cursor: pointer;
  }
  &.BtnText {
    font-weight: bold;
  }
`;
const Input = styled.input`
  width: 70%;
  border: none;
  font-size: 18px;
  font-weight: normal;
  line-height: 1.73;
  background-color: transparent;
  color: #e5e8ea;
  outline: none;
`;
const Btn = styled.button`
  &.Check {
    padding: 6px 15px;
    height: 40px;
    border-radius: 8px;
    background-color: #56586e;
  }
  &.Join {
    margin-top: 30px;
    width: 482px;
    height: 60px;
    padding: 16px 209px 16px 210px;
    border-radius: 16px;
    background-color: #f34a7e;
  }
`;

const Img = styled.img``;
