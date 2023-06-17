import { useState } from "react";
import styled from "styled-components";
import { addCommas } from "../../functions/addCommas";
import { useRouter } from "next/router";

export function Header() {
  return (
    <Div className="MenuTop">
      <Img src="/assets/images/icon-c-notice.png" className="IconC"></Img>
      {/* <Img src="/assets/images/icon-c-chat.png" className="IconC"></Img> */}
      <Img src="/assets/images/icon-c-setting.png" className="IconC"></Img>
      <Div className="IconSlash" />
      <Span className="ID">admon5488님</Span>
      {/* <Div className="ClickedBox">
        <Img src="/assets/images/icon-tooltip-arrow.png" className="PopupImg" />
        <Div className="LinkDropdown">
          <Div className="NameBox">
            <Span className="DropID">admon5488님</Span>
            <Div className="ColorBox">
              <Span className="IdRank">VIP</Span>
            </Div>
          </Div>
          <Div className="PointBox">
            <Div className="PointText">
              <Img src="/assets/images/icon-point.png" />
              <Span className="TextBox">누적포인트</Span>
            </Div>
            <Span className="DropText">10,000원</Span>
          </Div>
          <Div className="PointBox">
            <Div className="PointText">
              <Img src="/assets/images/icon-point.png" />
              <Span className="TextBox">누적포인트</Span>
            </Div>
            <Span className="DropText">758,400원</Span>
          </Div>
          <Div className="Line" />
          <Span className="DropText">구매내역</Span>
          <Span className="DropText">충전내역</Span>
          <Span className="DropText">비밀번호 변경</Span>
          <Span className="DropText">로그아웃</Span>
        </Div>
      </Div> */}
      <Div className="MenuMask">
        <Img src="/assets/images/icon-user.png" className="iconuser24"></Img>
      </Div>
    </Div>
  );
}
export function UserHeader({ user, data, setState }) {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  return (
    <Div className="UserMenuTop">
      <a href="/">
        <Img src="/assets/images/icon-c-home.png" className="IconC" />
      </a>
      <Div className="UserMenu">
        <Img src="/assets/images/icon-c-notice.png" className="IconC" />
        {/* <Img src="/assets/images/icon-c-chat.png" className="IconC" /> */}
        <Img src="/assets/images/icon-c-setting.png" className="IconC" />
        <Div className="IconSlash" />
        <Div onClick={() => setModal(!modal)}>
          <Span className="ID">{user.id}님</Span>
          {modal && (
            <Div className="ClickedBox">
              <Img
                src="/assets/images/icon-tooltip-arrow.png"
                className="PopupImg"
              />
              <Div className="LinkDropdown">
                <Div className="NameBox">
                  <Span className="DropID">{user.id}님</Span>
                  <Div className="ColorBox">
                    <Span className="IdRank">{user.grade}</Span>
                  </Div>
                </Div>
                <Div className="PointBox">
                  <Div className="PointText">
                    <Img src="/assets/images/icon-point.png" />
                    <Span className="TextBox">보유포인트</Span>
                  </Div>
                  <Span className="DropText">{addCommas(user.money)}원</Span>
                </Div>
                {/* <Div className="PointBox">
                  <Div className="PointText">
                    <Img src="/assets/images/icon-point.png" />
                    <Span className="TextBox">누적포인트</Span>
                  </Div>
                  <Span className="DropText">758,400원</Span>
                </Div> */}
                <Div className="Line" />
                <Span
                  className="DropText"
                  onClick={() => setState("purchaselog")}
                >
                  구매내역
                </Span>
                <Span
                  className="DropText"
                  onClick={() => setState("chargelog")}
                >
                  충전내역
                </Span>
                <Span className="DropText" onClick={() => setState("edituser")}>
                  비밀번호 변경
                </Span>
                <Span className="DropText" onClick={() => router.reload()}>
                  로그아웃
                </Span>
              </Div>
            </Div>
          )}
        </Div>
        <Div className="MenuMask" onClick={() => setModal(!modal)}>
          <Img
            src={
              data.setting.profile_url === ""
                ? "/assets/images/icon-user.png"
                : data.setting.profile_url
            }
            className="iconuser24"
          />
        </Div>
      </Div>
    </Div>
  );
}

const Div = styled.div`
  &.MenuTop {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 18px 30px;
    border-bottom: 1px solid #3d3f45;
    justify-content: flex-end;
  }
  &.UserMenuTop {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 18px 30px 18px 10px;
    border-bottom: 1px solid #3d3f45;
    justify-content: space-between;
  }
  &.UserMenu {
    display: flex;
    align-items: center;
  }
  &.IconSlash {
    width: 1px;
    height: 20px;
    margin: 8px 10px;
    background-color: #3d3f45;
  }
  &.MenuMask {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    margin: 0 0 0 12px;
    padding: 9px;
    background-image: linear-gradient(
      to bottom,
      rgba(213, 251, 255, 0.8),
      rgba(163, 226, 234, 0.8)
    );
    cursor: pointer;
  }
  &.LinkDropdown {
    position: absolute;
    width: 280px;
    height: 330px;
    margin-left: -100px;
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 16px;
    padding: 30px 30px;
    background-color: #35383f;
    z-index: 1;
    text-align: start;
  }
  &.ClickedBox {
    text-align: center;
  }
  &.NameBox {
    display: flex;
    align-items: center;
  }
  &.ColorBox {
    margin-left: 10px;
    padding: 0 8px;
    border-radius: 4px;
    background-color: #0cbe9d;
  }
  &.PointBox {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &.PointText {
    display: flex;
    align-items: center;
  }
  &.Line {
    width: 220px;
    height: 1px;
    background-color: #575a63;
  }
`;
const Span = styled.span`
  font-size: 15px;
  font-weight: normal;
  line-height: 1.75;
  color: #e5e8ea;
  &.ID {
    height: 28px;
    margin: 0px 12px 0px 20px;
    cursor: pointer;
  }
  &.DropID {
    font-size: 18px;
  }
  &.IdRank {
    font-size: 14px;
    font-weight: 600;
  }
  &.TextBox {
    margin: 0 5px;
  }
  &.DropText {
    color: #fff;
    cursor: pointer;
  }
`;
const Img = styled.img`
  &.IconC {
    width: 30px;
    height: 30px;
    margin: 0px 14px;
    object-fit: contain;
    cursor: pointer;
  }
  &.iconuser24 {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
  &.PopupImg {
    position: absolute;
    z-index: 1;
    margin-top: 11px;
  }
`;
