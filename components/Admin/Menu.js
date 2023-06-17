import styled from "styled-components";
import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Menu() {
  const router = useRouter();
  const menu = [
    { title: "홈", link: "/admin" },
    {
      title: "설정",
      link: "/admin/setting",
      sub: [
        { title: "공지사항", link: "/admin/setting/notice" },
        { title: "하이퍼링크", link: "/admin/setting/hyperlink" },
        { title: "팝업관리", link: "/admin/setting/popup" },
      ],
    },
    { title: "디자인", link: "/admin/design" },
    {
      title: "회원관리",
      link: "/admin/user",
      sub: [{ title: "아이피 차단", link: "/admin/user/blockip" }],
    },
    {
      title: "상품관리",
      link: "/admin/product",
      sub: [{ title: "카테고리", link: "/admin/product/category" }],
    },
    {
      title: "충전관리",
      link: "/admin/charge",
      sub: [{ title: "충전 요청", link: "/admin/charge/request" }],
    },
    { title: "판매내역", link: "/admin/sell" },
    { title: "수익통계", link: "/admin/analysis" },
  ];
  const [hovered, setHovered] = useState("");

  return (
    <Div className="Rectangle-Copy-5">
      <Div className="MenuBox">
        {menu.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {item.sub ? (
                <Div onMouseEnter={() => setHovered(item.title)}>
                  <a href={item.link}>
                    <Span
                      className={
                        router.asPath.includes(item.link) && "ClickedText"
                      }
                    >
                      {item.title}
                    </Span>
                  </a>
                  {item.title === hovered && (
                    <Div className="Dropdown">
                      {item.sub.map((itm, idx) => {
                        return (
                          <a href={itm.link} key={idx}>
                            <Span
                              className={
                                router.asPath === itm.link
                                  ? "DropClicked"
                                  : "Droptext"
                              }
                            >
                              {itm.title}
                            </Span>
                          </a>
                        );
                      })}
                    </Div>
                  )}
                </Div>
              ) : (
                <Span
                  className={router.asPath === item.link && "ClickedText"}
                  onMouseEnter={() => setHovered(item.title)}
                >
                  <a href={item.link} key={index}>
                    {item.title}
                  </a>
                </Span>
              )}
            </React.Fragment>
          );
        })}
      </Div>
    </Div>
  );
}

const Div = styled.div`
  &.Rectangle-Copy-5 {
    width: 100%;
    border-radius: 16px;
    box-shadow: inset 0 1px 2px 0 #3dc5d6;
    background-image: radial-gradient(circle at 0 -42%, #12a7b8, #272a31 7%);
  }
  &.MenuBox {
    margin: 0px 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &.Dropdown {
    position: absolute;
    margin-top: 17px;
    width: 131px;
    padding: 20px 20px;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 20px;
    border-radius: 6px;
    background-color: #35383f;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
`;
const Span = styled.span`
  padding: 16px 15px;
  margin: 0 25px;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.56;
  color: #7a7c85;
  cursor: pointer;
  &.ClickedText {
    color: #3dc6d7;
    border-bottom: 4px solid #3dc5d6;
  }
  &.Droptext {
    width: 100%;
    margin: 0;
    padding: 0;
    font-size: 16px;
    color: #e5e8ea;
  }
  &.DropClicked {
    width: 100%;
    margin: 0;
    padding: 0;
    font-size: 16px;
  }
`;
