import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
export default function Category({ setting, setting_sub }) {
  const [data, setData] = useState(setting);
  const [datasub, setDatasub] = useState(setting_sub);

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

  //카테고리 추가

  const handleDataChange = (index, value) => {
    const updatedData = [...data];
    updatedData[index].title = value;
    setData(updatedData);
  };

  const handleDatasubChange = (index, value) => {
    const updatedDatasub = [...datasub];
    updatedDatasub[index].title = value;
    setDatasub(updatedDatasub);
  };

  const onAdd = async () => {
    setData([...data, { id: uuidv4(), title: "" }]);
  };

  const onSubAdd = async (parent) => {
    console.log(parent);
    setDatasub([...datasub, { id: uuidv4(), title: "", category: parent }]);
  };

  const onSubDel = (id) => {
    const _data = datasub.filter((item) => item.id !== id);
    setDatasub(_data);
  };

  const onSave = async () => {
    await axios.post("http://localhost:3000/api/category_add", data);
    if (datasub.length !== 0) {
      await axios.post("http://localhost:3000/api/category_sub_add", datasub);
    }

    alert("저장");
  };

  return (
    <>
      <Div className="Container">
        <Div className="TopBox">
          <Span className="Title">카테고리</Span>
          <Btn onClick={onSave}>
            <Span className="BtnText">저장하기</Span>
          </Btn>
        </Div>
        <Div className="InfoBox">
          <Div className="Top" onClick={onAdd}>
            <Span className="SubTitle">카테고리 추가</Span>
            <Img src="/assets/images/icon-piuscircle.png" />
          </Div>
          {data.map((item, index) => {
            return (
              <Div
                className="Wrapper"
                key={index}
                onDragStart={() => handleDragStart(index)}
                onDragOver={(event) => handleDragOver(event, index)}
                onDrop={handleDrop}
              >
                <Div className="FirstInfo">
                  <Img src="/assets/images/icon-control.png" />
                  <Div className="Oval">
                    <Span>{index + 1}</Span>
                  </Div>
                  <Div className="FirstBox">
                    <Input
                      value={item.title}
                      onChange={(e) => handleDataChange(index, e.target.value)}
                    />
                    <Div className="ImgBox">
                      <Img src="/assets/images/icon-uparrow.png" />
                    </Div>
                    <Div className="ImgBox">
                      <Img src="/assets/images/icon-downarrow.png" />
                    </Div>
                    <Div className="ImgBox" onClick={() => onSubAdd(item.id)}>
                      <Img src="/assets/images/icon-pius.png" />
                    </Div>
                  </Div>
                </Div>
                {datasub.map((itm, idx) => {
                  if (itm.category === item.id) {
                    return (
                      <Div className="OtherInfo" key={idx}>
                        <Div className="OtherBox">
                          <Img src="/assets/images/icon-indentarrow.png" />
                          <Input
                            value={itm.title}
                            onChange={(e) =>
                              handleDatasubChange(idx, e.target.value)
                            }
                          />
                          <Div
                            className="ImgBox"
                            onClick={() => onSubDel(itm.id)}
                          >
                            <Img src="/assets/images/icon-pius.png" />
                          </Div>
                        </Div>
                      </Div>
                    );
                  }
                })}
              </Div>
            );
          })}
        </Div>
      </Div>
    </>
  );
}

const Div = styled.div`
  &.Container {
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
    border-bottom: 1px solid #3d3f45;
  }
  &.Top {
    width: 100%;
    padding-top: 25px;
    display: flex;
    align-items: center;
  }
  &.Wrapper {
    margin-top: 30px;
  }
  &.InfoBox {
    width: 100%;
    padding: 0px 40px;
  }
  &.FirstInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 15px;
  }
  &.OtherInfo {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    margin-top: 15px;
  }
  &.Oval {
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #3a3b44;
    margin: 0 11px;
  }
  &.FirstBox {
    width: 95%;
    height: 52px;
    border-radius: 10px;
    border: solid 1px #3d3f45;
    background-color: #31333a;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  &.OtherBox {
    width: 94%;
    height: 52px;
    border-radius: 10px;
    border: solid 1px #3d3f45;
    background-color: #31333a;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 15px;
  }
  &.ImgBox {
    width: 50px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid #3d3f45;
  }
`;
const Span = styled.span`
  line-height: 1.46;
  font-size: 15px;
  font-weight: normal;
  color: #e5e8ea;
  &.Title {
    font-size: 26px;
    font-weight: bold;
    color: #e5e8ea;
  }
  &.SubTitle {
    margin-right: 10px;
    font-size: 18px;
    font-weight: 500;
    color: #3dc6d7;
  }
  &.BtnText {
    font-size: 15px;
    font-weight: 600;
    color: #fff;
  }
`;
const Input = styled.input`
  height: 50px;
  width: 100%;
  border-radius: 10px;
  border: none;
  background-color: #31333a;
  font-size: 18px;
  font-weight: normal;
  color: #e5e8ea;
  outline: none;
  padding-left: 10px;
`;
const Btn = styled.button`
  height: 40px;
  padding: 8px 19px;
  border-radius: 23px;
  background-color: #00abbf;
`;

const Img = styled.img`
  cursor: pointer;
`;
