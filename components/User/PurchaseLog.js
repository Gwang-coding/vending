import styled from "styled-components";
import { addCommas } from "../../functions/addCommas";
import { useState, useEffect } from "react";
import axios from "axios";

function chunkArray(array, size) {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    chunkedArray.push(chunk);
  }
  return chunkedArray;
}

export default function PurchaseLog({ setState, user, data }) {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState(-1);
  const pageSize = 10;

  // 현재 페이지에 해당하는 데이터 가져오기
  const getCurrentPageData = () => {
    const chunkedData = chunkArray(list, pageSize);
    if (currentPage <= chunkedData.length) {
      return chunkedData[currentPage - 1];
    }
    return [];
  };

  const getList = async () => {
    const _data = { id: user.id };
    const res = await axios.post(
      "http://localhost:3000/api/user/purchaselog",
      _data
    );
    setList(res.data);
  };

  useEffect(() => {
    getList();
  }, []);
  return (
    <Div className="Wrapper">
      <Div className="Top">
        <Div className="NameBox">
          <Span className="ID">{user.id}</Span>
          <Span className="Rank">{user.grade}</Span>
        </Div>
        <Div className="TopText">
          <Img src="/assets/images/icon-chargemoney.png" className="point" />
          <Span className="Point">
            총 충전 금액 : {addCommas(user.total_money)}원
          </Span>
          <Img src="/assets/images/icon-purchasemoney.png" className="point" />
          <Span className="Point">
            총 구매 금액 : {addCommas(user.total_buy_money)}원
          </Span>
        </Div>
        <Div className="BtnBox">
          <Span className="Clicked" onClick={() => setState("purchaselog")}>
            구매내역
          </Span>
          <Span className="Menu" onClick={() => setState("chargelog")}>
            충전내역
          </Span>

          {data.setting.file_url === "1" && user.grade !== "비구매자" && (
            <Span className="Menu">
              <a href={data.setting.file_url_text} target="_blank">
                파일함
              </a>
            </Span>
          )}
          <Span className="Menu" onClick={() => setState("edituser")}>
            회원정보수정
          </Span>
        </Div>
      </Div>
      <Div className="Box">
        <Div className="TopBox">
          <Span className="Title">나의 구매 내역</Span>
        </Div>
        <Div className="Bar">
          <Span className="BarText">NO</Span>
          <Span className="BarText">구매날짜</Span>
          <Span className="BarText">상품명</Span>
          <Span className="BarText">기간</Span>
          <Span className="BarText">코드(코드클릭시복사)</Span>
          <Span className="BarText">가격</Span>
        </Div>
        {getCurrentPageData().map((item, index) => {
          const dataIndex = (currentPage - 1) * pageSize + index + 1;
          return (
            <Div className="Info" key={index}>
              <Span>{dataIndex}</Span>
              <Span>{item.date}</Span>
              <Span>{item.product}</Span>
              <Span>{item.day}일</Span>
              <Span
                onClick={() =>
                  navigator.clipboard
                    .writeText(item.product_id)
                    .then(() => alert("코드 복사"))
                }
              >
                {item.product_id}
              </Span>
              <Span>{addCommas(item.price)}원</Span>
            </Div>
          );
        })}

        <Div className="PageBox">
          <Div className="PageText">
            <Img
              src="/assets/images/icon-pagnagtion-left-2.png"
              className="iconpagnagtion"
              onClick={() => setCurrentPage(1)}
            />
          </Div>
          <Div className="PageText">
            <Img
              src="/assets/images/icon-pagnagtion-left.png"
              className="iconpagnagtion"
              onClick={() => setCurrentPage(currentPage - 1)}
            />
          </Div>
          {chunkArray(list, pageSize).map((_, index) => {
            const startPage = currentPage - 1 > 2 ? currentPage - 2 : 1;
            const endPage = startPage + 4;

            if (index + 1 >= startPage && index + 1 <= endPage) {
              return (
                <Div
                  key={index}
                  className={
                    currentPage === index + 1 ? "CheckedText" : "PageText"
                  }
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Div>
              );
            }
            return null;
          })}
          <Div className="PageText">
            <Img
              src="/assets/images/icon-pagnagtion-right.png"
              className="iconpagnagtion"
              onClick={() => setCurrentPage(currentPage + 1)}
            />
          </Div>
          <Div className="PageText">
            <Img
              src="/assets/images/icon-pagnagtion-right-2.png"
              className="iconpagnagtion"
              onClick={() => setCurrentPage(parseInt(list.length / 10) + 1)}
            />
          </Div>
        </Div>
      </Div>
    </Div>
  );
}

const Div = styled.div`
  &.Wrapper {
    display: flex;
    flex-direction: column;
  }
  &.Box {
    width: 1320px;
    margin-top: 40px;
    border-radius: 16px;
    background-color: #272a31;
    padding-bottom: 20px;
  }
  &.NameBox {
    display: flex;
    align-items: center;
  }
  &.TopText {
    display: flex;
    justify-content: space-between;
    width: 33%;
    align-items: center;
    margin-bottom: 10px;
  }
  &.TopBox {
    padding: 25px 40px;
  }
  &.BtnBox {
    display: flex;
    text-align: center;
  }
  &.Top {
    width: 1320px;
    height: 184px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 16px;
    padding: 30px 40px 0;
    background-color: #272a31;
  }
  &.Bar {
    display: grid;
    grid-template-columns: 9fr 18fr 26fr 12fr 26fr 18fr;
    padding: 15px 40px;
    text-align: center;
    width: 100%;
    background-color: #31333a;
  }
  &.Info {
    display: grid;
    grid-template-columns: 9fr 18fr 26fr 12fr 26fr 18fr;
    width: 100%;
    text-align: center;
    padding: 20px 40px;
    border-bottom: 1px solid #393b44;
  }
  &.PageBox {
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 30px 0;
  }
  &.PageText {
    width: 44px;
    height: 44px;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #7a7c85;
    cursor: pointer;
  }
  &.CheckedText {
    width: 44px;
    height: 44px;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
    border-radius: 6px;
    background-color: #1fa58c;
  }
`;

const Span = styled.span`
  font-size: 15px;
  font-weight: normal;
  line-height: 1.46;
  color: #e5e8ea;
  &.ID {
    font-size: 22px;
    font-weight: bold;
  }
  &.Point {
    color: #fff;
  }
  &.Rank {
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    background-color: #0cbe9d;
    padding: 1px 7px;
    border-radius: 3px;
    margin-left: 10px;
  }
  &.Menu {
    padding: 10px 0;
    width: 123px;
    font-size: 18px;
    font-weight: 500;
    color: #7a7c85;
    cursor: pointer;
  }
  &.Clicked {
    font-size: 18px;
    font-weight: 500;
    color: #16d8b4;
    width: 123px;
    padding: 10px 0;
    border-bottom: 5px solid #16d8b4;
    cursor: pointer;
  }
  &.Title {
    font-size: 28px;
    font-weight: bold;
  }
  &.BarText {
    font-size: 16px;
    font-weight: bold;
  }
`;
const Input = styled.input``;
const Btn = styled.button``;

const Img = styled.img`
  &.iconpagnagtion {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  &.point {
    margin-right: -25px;
  }
`;
