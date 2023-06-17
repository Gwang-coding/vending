import styled from "styled-components";
import { addCommas } from "../../functions/addCommas";
import React, { useState } from "react";
import Point from "../Etc/Point";
import ChargeModal from "../User/ChargeModal";
export function AdminSide() {
  const [point, setPoint] = useState("");
  const [modal, setModal] = useState(false);
  return (
    <React.Fragment>
      <Div className="Rectangle">
        <Div className="SideTop">
          <a href="/admin">
            <Span className="BEURRI">BEURRI</Span>
          </a>
          <Img
            src="/assets/images/icon-c-menu-gray.png"
            className="IconCMenuGray30"
          />
        </Div>
        <Div className="SideBottom">
          <Div className="Mask" bcolor="#a8cad0">
            <Img src="/assets/images/icon-user.png" className="iconuser44" />
            <Div className="Oval" bcolor="#049b62" />
          </Div>
          <Span>환영합니다</Span>
          <Div className="NameBox">
            <Span className="Id">admon5488님</Span>
            <Div className="ColorBox" bcolor="#1da7b7">
              <Span className="IdRank">관리자</Span>
            </Div>
          </Div>
          <Div className="Info">
            <Div className="TextBox">
              <Span className="Info">라이센스키</Span>
              <Span>-</Span>
            </Div>
            <Div className="TextBox">
              <Span className="Info">남은기간</Span>
              <Div className="DdayBox">
                <Span>-</Span>
                <Span className="Dday">D-0</Span>
              </Div>
            </Div>
            <Div className="TextBox">
              <Span className="Info">오픈</Span>
              <Span>-</Span>
            </Div>
            <Div className="TextBox">
              <Span className="Info">인증기기</Span>
              <Span>-</Span>
            </Div>
            <Input
              className="LicenseInput"
              type="text"
              placeholder="라이센스입력"
            />
            <Btn className="License" color="#f34a7e">
              라이센스 연장
            </Btn>
          </Div>
          <Div className="Info">
            <Span className="Info">전체 회원 포인트</Span>
            <Div className="InputBox">
              <Input
                className="Rectangle-Copy-21"
                type="text"
                value={point}
                onChange={(e) => setPoint(e.target.value)}
              />
              <Span>P</Span>
            </Div>
            <Btn
              className="License"
              color="#363c69"
              onClick={() => setModal(true)}
            >
              포인트 지급
            </Btn>
          </Div>
        </Div>
      </Div>
      {modal && <Point point={point} setModal={setModal} />}
    </React.Fragment>
  );
}

//유저사이드
export function UserSide({ user, setState, data }) {
  const [cta, setCta] = useState("");
  const [modal, setModal] = useState(false);
  return (
    <Div className="Rectangle">
      <Div className="SideTop">
        <a href="/">
          <Span className="BEURRI">BEURRI</Span>
        </a>
        <Img
          src="/assets/images/icon-c-menu-gray.png"
          className="IconCMenuGray30"
        />
      </Div>
      <Div className="SideBottom">
        <Div className="Mask" bcolor="#272a31">
          <Img
            src={
              data.setting.profile_url === ""
                ? "/assets/images/icon-user-44.png"
                : data.setting.profile_url
            }
            className="iconuser44"
          />
          <Div className="Oval" bcolor="#ffd700" />
        </Div>
        <Div className="NameBox" left="50px">
          <Span className="Id">{user.id}님</Span>
          <Div className="ColorBox" bcolor="#0cbe9d">
            <Span className="IdRank">{user.grade}</Span>
          </Div>
        </Div>
        <Div className="UserInfo">
          <Span>보유금액</Span>
          <a href="/join">
            <Span className="Id">{addCommas(user.money)}원</Span>
          </a>
          <Btn
            className="UserBtn"
            width="100%"
            color="#1fa58c"
            onClick={() => setModal(true)}
          >
            <Span>충전하기</Span>
          </Btn>
          <Div className="BtnBox">
            <Btn
              className="UserBtn"
              width="48%"
              color="#1a8ac7"
              onClick={() => setState("purchaselog")}
            >
              <Span>구매내역</Span>
            </Btn>
            <Btn
              className="UserBtn"
              width="48%"
              color="#1a8ac7"
              onClick={() => setState("chargelog")}
            >
              <Span>충전내역</Span>
            </Btn>
          </Div>
        </Div>
        <Div className="MenuBox">
          {data.category.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <Div
                  className="Menu"
                  bcolor={cta === item.title && "#252931"}
                  onClick={() => setCta(item.title)}
                >
                  <Div className="MenuText">
                    <Img src="/assets/images/icon-house.png" />
                    <Span>{item.title}</Span>
                  </Div>
                  <Img
                    className="IconARightGray"
                    src={`/assets/images/icon-a-right-gray-${
                      cta === item.title ? "up" : "down"
                    }.png`}
                  />
                </Div>
                {cta === item.title &&
                  data.category_sub.map((itm, idx) => {
                    if (itm.category === item.id) {
                      return (
                        <Div className="Menu" key={idx}>
                          <Span className="Detail">ㄴ {itm.title}</Span>
                        </Div>
                      );
                    }
                  })}
              </React.Fragment>
            );
          })}
        </Div>
        <Div className="MenuBox">
          {data.hyperlink.map((item, index) => {
            return (
              <Div className="Menu" key={index}>
                <a href={item.link} target="_blank">
                  <Div className="MenuText">
                    <Img
                      src="/assets/images/icon-c-file-gray.png"
                      className="MenuImg"
                    />
                    <Span>{item.name}</Span>
                  </Div>
                </a>
              </Div>
            );
          })}
        </Div>
        {data.setting.viewer === "1" && (
          <>
            <Div className="TodayBox">
              <Div className="Today">
                <Span className="Today">Today</Span>
              </Div>
              <Span className="TodayNum">21,587</Span>
            </Div>
            <Div className="TodayBox">
              <Span>이번주 방문자</Span>
              <Span>6,350</Span>
            </Div>
            <Div className="TodayBox">
              <Span>이번달 방문자</Span>
              <Span>105,350</Span>
            </Div>
          </>
        )}
      </Div>
      {modal && <ChargeModal setModal={setModal} user={user} data={data} />}
    </Div>
  );
}
const Div = styled.div`
  &.Rectangle {
    background-color: #13171e;
    width: 15%;
    padding-bottom: 80px;
  }
  &.SideTop {
    display: flex;
    justify-content: space-between;
    padding: 20px 30px;
    border-bottom: 1px solid #3d3f45;
  }
  &.SideBottom {
    display: flex;
    flex-direction: column;
    padding: 40px 20px;
    align-items: center;
    height: 100%;
  }
  &.Mask {
    width: 70px;
    height: 69px;
    padding: 16px 15px 7px 16px;
    border-radius: 50%;
    background-color: ${(props) => props.bcolor};
    margin-bottom: 15px;
  }
  &.Info {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 20px 0;
    padding: 21px 19px;
    border-radius: 20px;
    border: solid 1px #3d3f45;
    background-color: #20232a;
    text-align: start;
  }
  &.UserInfo {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 20px 0 0;
    padding: 21px 19px;
    border-radius: 20px;
    border: solid 1px #3d3f45;
    background-color: #20232a;
    text-align: center;
  }
  &.TextBox {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
  }
  &.DdayBox {
    width: 100%;
    display: flex;
  }
  &.NameBox {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &.Oval {
    width: 10px;
    height: 10px;
    margin-left: 36px;
    border-radius: 50%;
    background-color: ${(props) => props.bcolor};
  }
  &.InputBox {
    width: 100%;
    height: 46px;
    margin: 12px 0 16px;
    display: flex;
    align-items: center;
    padding-right: 10px;
    border-radius: 10px;
    border: solid 1px #3d3f45;
    background-color: #31333a;
  }
  &.ColorBox {
    height: 22px;
    margin-left: 10px;
    padding: 0 8px;
    border-radius: 4px;
    background-color: ${(props) => props.bcolor};
  }
  &.BtnBox {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  &.MenuBox {
    width: 100%;
    border-bottom: 1px solid #3d3f45;
    padding: 20px 0px;
  }
  &.TodayBox {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
  }
  &.Today {
    width: 58px;
    height: 26px;
    background-color: #f06868;
    display: flex;
    justify-content: center;
    border-radius: 6px;
  }
  &.Menu {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    padding: 8px 10px;
    border-radius: 6px;
    justify-content: space-between;
    background-color: ${(props) => props.bcolor};
    cursor: pointer;
  }
  &.MenuText {
    display: flex;
    align-items: center;
  }
`;
const Span = styled.span`
  line-height: 1.46;
  font-size: 15px;
  color: #e5e8ea;
  font-weight: normal;

  &.BEURRI {
    font-size: 26px;
    color: #fff;
    font-weight: bold;
  }
  &.Id {
    font-size: 18px;
  }
  &.IdRank {
    font-size: 13px;
    font-weight: 600;
  }
  &.Info {
    font-size: 500;
    color: #979aa0;
  }
  &.Menu {
    color: #1ec9a9;
  }
  &.Detail {
    color: #7a7c85;
    margin-left: 5%;
  }
  &.Today {
    font-size: 14px;
    font-weight: bold;
    color: #fff;
  }
  &.TodayNum {
    font-size: 26px;
    color: #f06868;
  }
  &.Dday {
    margin-left: 10px;
    display: flex;
    align-items: center;
    height: 22px;
    padding: 0 7px;
    opacity: 0.7;
    border-radius: 12px;
    border: solid 1px #f5739c;
    color: #f5739c;
  }
`;
const Input = styled.input`
  outline: none;
  width: 100%;
  display: flex;
  background-color: #31333a;
  padding: 13px 10px;
  font-size: 15px;
  font-weight: normal;
  color: #fff;

  &.LicenseInput {
    margin: 5px 0 20px 0;
    border-radius: 10px;
    border: solid 1px #3d3f45;
  }
  &.Rectangle-Copy-21 {
    border: none;
  }
`;
const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e5e8ea;
  background-color: ${(props) => props.color};
  font-weight: bold;
  &.License {
    width: 100%;
    height: 44px;
    border-radius: 23px;
  }
  &.UserBtn {
    margin-top: 10px;
    width: ${(props) => props.width};
    padding: 12px 0px;
    border-radius: 8px;
  }
`;
const Img = styled.img`
  &.IconCMenuGray30 {
    width: 30px;
    height: 30px;
    margin: 3px 0 0px 43px;
    object-fit: contain;
    cursor: pointer;
  }
  &.iconuser44 {
    width: 38px;
    height: 38px;
    object-fit: contain;
  }
  &.IconARightGray {
    width: 16px;
    height: 16px;
    object-fit: contain;
  }
  &.MenuImg {
    margin-right: 10px;
  }
`;
