import React, { useState } from "react";
import styled from "styled-components";
import PopupManage from "./PopupManage";

export default function Popup({ setting }) {
  const [data, setData] = useState(setting);
  const [modify, setModify] = useState(false);
  const [modifyIndex, setModifyIndex] = useState(0);
  const [add, setAdd] = useState(false);

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
  const handleDrop = (event) => {
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
  };

  return (
    <>
      {modify ? (
        <PopupManage
          index={modifyIndex}
          data={data}
          setData={setData}
          setModify={setModify}
          add={add}
        />
      ) : (
        <Div className="Wrapper">
          <Div className="Box">
            <Span className="Title">팝업관리</Span>
            <Btn
              className="PlusBtn"
              onClick={() => {
                setAdd(true);
                setModifyIndex(data.length + 1);
                setModify(true);
              }}
            >
              <Span className="BtnText">+ 추가하기</Span>
            </Btn>
          </Div>
          <Div className="PopBar">
            <Span className="TitleText">제목</Span>
          </Div>
          {data.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <Div
                  className="Box"
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(event) => handleDragOver(event, index)}
                  onDrop={handleDrop}
                >
                  <Div className="PopWrapper">
                    <Img src="/assets/images/icon-a-updowncotrol-gray.png" />
                    <Span>{item.title}</Span>
                  </Div>
                  <Div>
                    <Btn
                      className="ModBtn"
                      onClick={() => {
                        setAdd(false);
                        setModifyIndex(index);
                        setModify(true);
                      }}
                    >
                      <Span>수정</Span>
                    </Btn>
                    <Btn className="DelBtn">
                      <Span>삭제</Span>
                    </Btn>
                  </Div>
                </Div>
                <Div className="Line" />
              </React.Fragment>
            );
          })}
        </Div>
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
    padding-bottom: 5px;
  }
  &.Box {
    width: 100%;
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
  }
  &.PopBar {
    width: 100%;
    padding: 15px 0;
    text-align: center;
    background-color: #31333a;
  }
  &.Line {
    width: 100%;
    height: 1px;
    background-color: #393b44;
  }
  &.PopWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const Span = styled.span`
  color: #e5e8ea;
  line-height: 1.46;
  font-weight: normal;
  font-size: 15px;

  &.Title {
    font-size: 26px;
    font-weight: bold;
  }
  &.BtnText {
    color: #fff;
    font-weight: 600;
  }
  &.TitleText {
    font-size: 16px;
    font-weight: bold;
  }
`;
const Btn = styled.button`
  &.PlusBtn {
    height: 40px;
    padding: 8px 19px;
    border-radius: 23px;
    background-color: #00abbf;
  }
  &.ModBtn {
    width: 60px;
    height: 34px;
    padding: 5px 17px;
    border-radius: 6px;
    background-color: #00abbf;
  }
  &.DelBtn {
    width: 60px;
    height: 34px;
    padding: 5px 17px;
    border-radius: 6px;
    background-color: #f34a7e;
    margin-left: 15px;
  }
`;

const Img = styled.img`
  padding-right: 10px;
  cursor: pointer;
`;
