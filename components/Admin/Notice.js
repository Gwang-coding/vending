import styled from "styled-components";
import dynamic from "next/dynamic";
const NoticeEditor = dynamic(() => import("../Editor/NoticeEditor"), {
  ssr: false,
});
import { useState, useRef } from "react";
import { convertData } from "../../functions/convertData";
import axios from "axios";
export default function Notice({ setting }) {
  const editorRef = useRef();
  const [data, setData] = useState(setting);

  //값 변경
  const updateValue = (name, value) => {
    const updatedData = data.map((item) => {
      if (item.name === name) {
        return { ...item, value: value };
      }
      return item;
    });

    setData(updatedData);
  };

  //저장하기
  const onSave = async () => {
    const res = await axios.post("/api/setting_write", data);
    if (res.data.exists) {
      alert("저장완료");
    }
  };
  return (
    <Div className="Wrapper">
      <Div className="EditorTop">
        <Span className="EditorTitle">공지사항</Span>
        <Span className="EditorText">
          메인공지 점검공지
          <Div className="Rectangle-Copy-2-off">
            <Div className="Oval-Copy-2" />
          </Div>
          <Btn onClick={onSave}>저장하기</Btn>
        </Span>
      </Div>
      <Div className="EditorBox">
        <NoticeEditor
          setting={data}
          editorRef={editorRef}
          updateValue={updateValue}
          initValue={convertData(setting, "notice")}
        />
      </Div>
      <Span className="EditorText">긴급공지</Span>
      <Div className="EditorBox">
        <TextArea
          value={convertData(data, "more_notice")}
          onChange={(e) => updateValue("more_notice", e.target.value)}
        />
      </Div>
    </Div>
  );
}

const Div = styled.div`
  &.Wrapper {
    width: 100%;
    padding: 25px 40px;
    margin: 40px 0px;
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    background-color: #272a31;
  }
  &.EditorTop {
    width: 100%;
    padding-bottom: 25px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #3d3f45;
  }
  &.Rectangle-Copy-2-off {
    width: 62px;
    height: 32px;
    padding: 4px 34px 4px 4px;
    margin: 0px 40px 0px 16px;
    border-radius: 100px;
    background-color: #474950;
    cursor: pointer;
  }
  &.Rectangle-Copy-2-on {
    width: 62px;
    height: 32px;
    padding: 4px 4px 4px 34px;
    border-radius: 100px;
    background-color: #00abbf;
    cursor: pointer;
  }
  &.Oval-Copy-2 {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    box-shadow: 0 1px 3px 0 rgba(17, 17, 17, 0.5);
    background-color: #e5e8ea;
  }
  &.EditorBox {
    margin: 25px 0;
  }
`;
const Span = styled.span`
  color: #e5e8ea;
  line-height: 1.46;

  &.EditorTitle {
    font-size: 26px;
    font-weight: bold;
    color: #e5e8ea;
  }
  &.EditorText {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: normal;
  }
`;

const TextArea = styled.textarea`
  outline: none;
  width: 100%;
  height: 329px;
  padding: 10px;
  border-radius: 10px;
  border: solid 1px #3d3f45;
  background-color: #31333a;
  font-size: 15px;
  font-weight: normal;
  color: #e5e8ea;
  resize: none;
`;
const Btn = styled.button`
  height: 40px;
  padding: 8px 19px;
  border-radius: 10px;
  background-color: #00abbf;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
`;
