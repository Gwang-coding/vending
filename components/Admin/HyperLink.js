import styled from "styled-components";
import React, { useState } from "react";
import axios from "axios";
export default function Link({ setting }) {
  const [data, setData] = useState(setting);
  const [add, setAdd] = useState({
    name: "",
    link: "",
    buyer: "0",
  });
  const [sub, setSub] = useState(false);

  //값 추가
  const onAdd = async () => {
    const _data = { no: data.length + 1, ...add };
    setData([...data, _data]);
    setAdd({
      name: "",
      link: "",
      buyer: "0",
    });
    await axios.post("/api/hyperlink_write", [...data, _data]);
  };

  //값 삭제
  const onDel = async (idx) => {
    const _data = data.filter((item) => item.no != idx);
    const newData = _data.map((item, index) => {
      return { ...item, no: index + 1 };
    });
    console.log(newData);
    setData(newData);
    await axios.post("/api/hyperlink_write", newData);
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
      <Div className="Wrapper">
        <Div className="Link">
          <Span className="Title">하이퍼링크</Span>
        </Div>
        <Div className="Line" />
        <Div className="Link">
          <Span className="SubTitle">링크추가</Span>
          <Div className="LinkPlus">
            <Div className="LinkBox">
              <Span>이름</Span>
              <Input
                placeholder="이름"
                width="65%"
                value={add.name}
                onChange={(e) => setAdd({ ...add, name: e.target.value })}
              />
            </Div>
            <Div className="LinkBox" width="50%">
              <Span>링크 URL(http://필수)</Span>
              <Input
                placeholder="링크 URL"
                width="65%"
                value={add.link}
                onChange={(e) => setAdd({ ...add, link: e.target.value })}
              />
            </Div>
            <Div className="LinkBox" width="530px">
              <Span>구매자 이상만 보기</Span>
              <Div>
                <Div className="DropdownBox" onClick={() => setSub(!sub)}>
                  <Span>{add.buyer === "0" ? "아니요" : "예"}</Span>
                  <Img src="/assets/images/icon-a-right-gray.png" />
                </Div>
                {sub && (
                  <Div className="LinkDropdown" onClick={() => setSub(!sub)}>
                    <Span onClick={() => setAdd({ ...add, buyer: "1" })}>
                      예
                    </Span>
                    <Span onClick={() => setAdd({ ...add, buyer: "0" })}>
                      아니요
                    </Span>
                  </Div>
                )}
              </Div>
              <Btn className="PlusBtn" onClick={onAdd}>
                + 추가하기
              </Btn>
            </Div>
          </Div>
          <Span className="SubTitle">링크관리</Span>
        </Div>
        <Div className="LinkBar">
          <Span className="BarText">NO</Span>
          <Span className="BarText">이름</Span>
          <Span className="BarText">링크</Span>
          <Span className="BarText">구매자이상 보이기</Span>
          <Span className="BarText" />
        </Div>
        {data.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Div
                className="LinkInfo"
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(event) => handleDragOver(event, index)}
                onDrop={handleDrop}
              >
                <Span className="LinkText">
                  <Img src="/assets/images/icon-a-updowncotrol-gray.png" />
                </Span>
                <Span className="LinkText">{item.name}</Span>
                <Span className="LinkText">{item.link}</Span>
                <Span className="LinkText">
                  {item.buyer === "0" ? "아니오" : "예"}
                </Span>
                <Btn className="Delete" onClick={() => onDel(item.no)}>
                  <Span>삭제</Span>
                </Btn>
              </Div>
              <Div className="Line" />
            </React.Fragment>
          );
        })}
      </Div>
      <Div className="PageBox">
        <Div className="PageText">
          <Img
            src="/assets/images/icon-pagnagtion-left-2.png"
            className="iconpagnagtion"
          />
        </Div>
        <Div className="PageText">
          <Img
            src="/assets/images/icon-pagnagtion-left.png"
            className="iconpagnagtion"
          />
        </Div>
        <Div className="CheckedText">1</Div>
        <Div className="PageText">
          <Img
            src="/assets/images/icon-pagnagtion-right.png"
            className="iconpagnagtion"
          />
        </Div>
        <Div className="PageText">
          <Img
            src="/assets/images/icon-pagnagtion-right-2.png"
            className="iconpagnagtion"
          />
        </Div>
      </Div>
    </>
  );
}

const Div = styled.div`
  &.Wrapper {
    width: 100%;
    margin-top: 40px;
    padding-bottom: 15px;
    border-radius: 16px;
    background-color: #272a31;
  }
  &.Link {
    width: 100%;
    padding: 25px 40px;
    display: flex;
    flex-direction: column;
  }
  &.LinkPlus {
    width: 100%;
    display: flex;
    padding: 20px 0;
    margin-bottom: 25px;
    justify-content: space-between;
    border-bottom: 1px solid #3d3f45;
  }
  &.LinkBox {
    width: ${(props) => props.width};
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &.DropdownBox {
    width: 200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 52px;
    padding: 15px;
    margin: 0 20px;
    border-radius: 10px;
    border: solid 1px #3d3f45;
    background-color: #31333a;
    cursor: pointer;
  }
  &.LinkDropdown {
    position: absolute;
    margin: 5px 20px 0;
    width: 200px;
    display: grid;
    padding: 20px;
    grid-template-columns: 1fr;
    border-radius: 10px;
    row-gap: 10px;
    border: solid 1px #3d3f45;
    box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.2);
    background-color: #31333a;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1;
    cursor: pointer;
  }
  &.LinkBar {
    display: grid;
    grid-template-columns: 1fr 3fr 6fr 3fr 1fr;
    width: 100%;
    padding: 10px 40px;
    background-color: #31333a;
  }
  &.LinkInfo {
    display: grid;
    grid-template-columns: 1fr 3fr 6fr 3fr 1fr;
    padding: 10px 40px;
    background-color: #272a31;
    margin-top: 10px;
  }
  &.Line {
    height: 1px;
    width: 100%;
    background-color: #393b44;
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
    border-radius: 50%;
    background-color: #00abbf;
  }
`;
const Span = styled.span`
  color: #e5e8ea;
  line-height: 1.56;
  font-weight: normal;
  font-size: 15px;

  &.Title {
    font-size: 26px;
    font-weight: bold;
  }
  &.SubTitle {
    font-size: 22px;
    font-weight: bold;
  }
  &.BarText {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }
  &.LinkText {
    text-align: center;
  }
`;

const Input = styled.input`
  width: ${(props) => props.width};
  height: 52px;
  padding-left: 10px;
  margin: 0 20px;
  border-radius: 10px;
  border: solid 1px #3d3f45;
  background-color: #31333a;
  font-size: 15px;
  font-weight: normal;
  color: #e5e8ea;
  outline: none;
`;
const Btn = styled.button`
  &.PlusBtn {
    height: 40px;
    padding: 10px 19px;
    border-radius: 10px;
    background-color: #00abbf;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
  }
  &.Delete {
    width: 60px;
    height: 34px;
    padding: 5px 17px;
    border-radius: 6px;
    background-color: #f34a7e;
  }
`;

const Img = styled.img`
  &.iconpagnagtion {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;
