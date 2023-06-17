import styled from "styled-components";
import React, { useState, useRef } from "react";
import ProdectManageIn from "./ProductManageIn";
import axios from "axios";
import { addCommas } from "../../functions/addCommas";

function chunkArray(array, size) {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    chunkedArray.push(chunk);
  }
  return chunkedArray;
}

const combineCategories = (category, category_sub) => {
  const result = [];

  category.forEach((cat) => {
    result.push(cat.title);

    category_sub.forEach((sub) => {
      if (sub.category === cat.id) {
        result.push(`${cat.title} - ${sub.title}`);
      }
    });
  });

  return result;
};

export default function ProdectManage({ category, category_sub, setting }) {
  const [data, setData] = useState(setting);
  const [modifyIndex, setModifyIndex] = useState(-1);
  const [add, setAdd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState(-1);
  const pageSize = 10;
  const _category = combineCategories(category, category_sub);

  //값 변경
  const changePatch = async (index) => {
    const updatedData = data.map((item) =>
      item.id === index
        ? { ...item, patch: item.patch === "0" ? "1" : "0" }
        : item
    );

    setData(updatedData);

    await axios.post(
      "http://localhost:3000/api/products_list_write",
      updatedData
    );
  };

  const changeCategory = async (index, value) => {
    const updatedData = data.map((item) =>
      item.id === index ? { ...item, category: value } : item
    );
    console.log(updatedData);

    setData(updatedData);

    await axios.post(
      "http://localhost:3000/api/products_list_write",
      updatedData
    );
  };

  // 드래그 중인 항목의 인덱스와 이동 중인 위치의 인덱스를 추적하는 상태
  const [dragIndex, setDragIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  // 항목을 드래그하기 시작할 때 호출되는 이벤트 핸들러
  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  // 항목이 드롭 영역 위로 이동할 때 호출되는 이벤트 핸들러
  const handleDragOver = (event, index) => {
    event.preventDefault();
    setHoverIndex(index);
  };

  // 항목이 드롭 영역 내에서 드롭될 때 호출되는 이벤트 핸들러
  const handleDrop = async (event) => {
    event.preventDefault();
    if (dragIndex === null || hoverIndex === null) {
      return;
    }

    // 드래그 중인 항목의 정보 가져오기
    const draggedItem = data[dragIndex];

    // 배열에서 드래그 중인 항목 제거
    const updatedData = data.filter((_, index) => index !== dragIndex);

    // 이동 중인 위치에 드래그 중인 항목 삽입
    updatedData.splice(hoverIndex, 0, draggedItem);

    // 배열의 순서를 업데이트
    setData(updatedData);

    // 상태 초기화
    setDragIndex(null);
    setHoverIndex(null);

    await axios.post(
      "http://localhost:3000/api/products_list_write",
      updatedData
    );
  };

  // 현재 페이지에 해당하는 데이터 가져오기
  const getCurrentPageData = () => {
    const chunkedData = chunkArray(data, pageSize);
    if (currentPage <= chunkedData.length) {
      return chunkedData[currentPage - 1];
    }
    return [];
  };

  return (
    <>
      {add ? (
        <ProdectManageIn
          _category={_category}
          data={data}
          setData={setData}
          setAdd={setAdd}
          modifyIndex={modifyIndex}
        />
      ) : (
        <>
          <Div className="Wrapper">
            <Div className="TopBox">
              <Span className="Title">상품관리</Span>
              <Btn
                onClick={() => {
                  setModifyIndex(-1);
                  setAdd(true);
                }}
              >
                <Span className="BtnText">+ 추가하기</Span>
              </Btn>
            </Div>
            <Div className="Bar">
              <Span className="BarText" />
              <Span className="BarText">상품명</Span>
              <Span className="BarText">카테고리</Span>
              <Span className="BarText">첫번째 가격</Span>
              <Span className="BarText">두번째 가격</Span>
              <Span className="BarText">세번째 가격</Span>
              <Span className="BarText">첫번째 재고</Span>
              <Span className="BarText">두번째 재고</Span>
              <Span className="BarText">세번째 재고</Span>
              <Span className="BarText">패치중</Span>
              <Span className="BarText" />
            </Div>
            {getCurrentPageData().map((item, index) => {
              const dataIndex = (currentPage - 1) * pageSize + index + 1;
              return (
                <React.Fragment key={index}>
                  <Div
                    className="Info"
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(event) => handleDragOver(event, index)}
                    onDrop={handleDrop}
                  >
                    <Span>
                      <Img src="/assets/images/icon-a-updowncotrol-gray.png" />
                    </Span>
                    <Span>{item.title}</Span>
                    <Div className="InputBox">
                      <Div
                        className="Input"
                        onClick={() => setCurrentCategory(index)}
                      >
                        <Span>{item.category}</Span>
                        <Img src="/assets/images/icon-a-right-gray.png"></Img>
                      </Div>
                      {currentCategory === index && (
                        <Div className="Dropdown">
                          {_category.map((itm, idx) => {
                            return (
                              <Span
                                className="dropdown"
                                key={idx}
                                onClick={() => {
                                  changeCategory(item.id, itm);
                                  setCurrentCategory(-1);
                                }}
                              >
                                {itm}
                              </Span>
                            );
                          })}
                        </Div>
                      )}
                    </Div>
                    <Span>{addCommas(item.price1)}원</Span>
                    <Span>{addCommas(item.price2)}원</Span>
                    <Span>{addCommas(item.price3)}원</Span>
                    <Span>{addCommas(item.amount1)}개</Span>
                    <Span
                      className="NostockText"
                      size="15px"
                      weight="bold"
                      width="90px"
                    >
                      {addCommas(item.amount2)}개
                    </Span>
                    <Span> {addCommas(item.amount3)}개</Span>
                    <Div className="InputBox">
                      <Div
                        className={`Rectangle-Copy-2-${
                          item.patch === "0" ? "off" : "on"
                        }`}
                        onClick={() => changePatch(item.id)}
                      >
                        <Div className="Oval-Copy-2"></Div>
                      </Div>
                    </Div>
                    <Span
                      onClick={() => {
                        setModifyIndex(dataIndex - 1);
                        setAdd(true);
                      }}
                    >
                      <a>관리</a>
                    </Span>
                  </Div>
                  <Div className="Line" />
                </React.Fragment>
              );
            })}
          </Div>

          <Div className="PageBox">
            {/* 이전 페이지 */}
            <Img
              src="/assets/images/icon-pagnagtion-left-2.png"
              className="iconpagnagtion"
              onClick={() => setCurrentPage(1)}
            />
            <Img
              src="/assets/images/icon-pagnagtion-left.png"
              className="iconpagnagtion"
              onClick={() => setCurrentPage(currentPage - 1)}
            />
            {/* 페이지 번호 */}
            {chunkArray(data, pageSize).map((_, index) => {
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
            {/* 다음 페이지 */}
            <Img
              src="/assets/images/icon-pagnagtion-right.png"
              className="iconpagnagtion"
              onClick={() => setCurrentPage(currentPage + 1)}
            />
            <Img
              src="/assets/images/icon-pagnagtion-right-2.png"
              className="iconpagnagtion"
              onClick={() => setCurrentPage(parseInt(data.length / 10) + 1)}
            />
          </Div>
        </>
      )}
    </>
  );
}

const Div = styled.div`
  &.Wrapper {
    width: 100%;
    margin-top: 40px;
    border-radius: 16px;
    background-color: #272a31;
    padding-bottom: 20px;
  }
  &.TopBox {
    width: 100%;
    padding: 25px 40px;
    display: flex;
    justify-content: space-between;
  }
  &.Bar {
    display: grid;
    grid-template-columns: 2.4fr 13fr 23fr 13fr 13fr 13fr 9fr 9fr 9fr 9fr 2.6fr;
    padding: 15px 40px;
    width: 100%;
    text-align: center;
    background-color: #31333a;
  }
  &.Info {
    display: grid;
    grid-template-columns: 2.4fr 13fr 23fr 13fr 13fr 13fr 9fr 9fr 9fr 9fr 2.6fr;
    width: 100%;
    text-align: center;
    padding: 20px 40px;
  }
  &.InputBox {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  &.Input {
    cursor: pointer;
    width: 230px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 46px;
    padding: 15px;
    border-radius: 10px;
    border: solid 1px #3d3f45;
    background-color: #31333a;
  }
  &.Dropdown {
    position: absolute;
    margin-top: 50px;
    width: 230px;
    padding: 20px 20px;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 20px;
    text-align: start;
    border-radius: 10px;
    background-color: #31333a;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  &.Rectangle-Copy-2-on {
    width: 50px;
    height: 26px;
    margin: 0 20px;
    padding: 3px 4px 3px 26px;
    border-radius: 100px;
    background-color: #00abbf;
    cursor: pointer;
  }
  &.Rectangle-Copy-2-off {
    width: 50px;
    height: 26px;
    margin: 0 20px;
    padding: 3px 26px 3px 4px;
    border-radius: 100px;
    background-color: #474950;
    cursor: pointer;
  }

  &.Oval-Copy-2 {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    box-shadow: 0 1px 3px 0 rgba(17, 17, 17, 0.5);
    background-color: #e5e8ea;
  }
  &.PageBox {
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 30px 0;
    align-items: center;
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
    border-radius: 50%;
    background-color: #00abbf;
    color: #fff;
    cursor: pointer;
  }
  &.Line {
    height: 1px;
    width: 100%;
    background-color: #393b44;
  }
`;
const Span = styled.span`
  font-size: 15px;
  font-weight: normal;
  line-height: 1.46;
  color: #e5e8ea;
  &.Title {
    font-size: 26px;
    font-weight: bold;
  }
  &.SubTitle {
    font-size: 22px;
    font-weight: bold;
  }
  &.BtnText {
    font-weight: 600;
    color: #fff;
  }
  &.BarText {
    font-size: 16px;
    font-weight: bold;
  }
  &.dropdown {
    cursor: pointer;
  }
`;
const Input = styled.input``;
const Btn = styled.button`
  height: 40px;
  padding: 8px 16px;
  border-radius: 23px;
  background-color: #00abbf;
`;

const Img = styled.img`
  &.iconpagnagtion {
    width: 24px;
    height: 24px;
    margin: 0 10px;
  }
  cursor: pointer;
`;
