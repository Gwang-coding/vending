import styled from "styled-components";
import dynamic from "next/dynamic";
const PopupEditor = dynamic(() => import("../Editor/PopupEditor"), {
  ssr: false,
});
import { useRef, useState } from "react";
import axios from "axios";
export default function PopupManage({ index, data, setData, setModify, add }) {
  const [title, setTitle] = useState(add ? "" : data[index].title);
  const editorRef = useRef();

  //값 변경
  const updateValue = async () => {
    if (add) {
      const updatedData = {
        no: index,
        title: title,
        content: editorRef.current?.getInstance().getHTML(),
      };

      const _data = [...data, updatedData];

      await axios.post("/api/popup_write", _data);

      setData(_data);
      setModify(false);
    } else {
      const updatedData = data.map((item) => {
        if (item.no === index + 1) {
          return {
            ...item,
            title: title,
            content: editorRef.current?.getInstance().getHTML(),
          };
        }
        return item;
      });

      await axios.post("/api/popup_write", updatedData);

      setData(updatedData);
      setModify(false);
    }
  };
  return (
    <Div className="Wrapper">
      <Div className="PopTop">
        <Span className="Title">팝업관리</Span>
        <Btn className="PlusBtn" onClick={() => updateValue()}>
          <Span className="BtnText">+ 추가하기</Span>
        </Btn>
      </Div>
      <Div className="PopBottom">
        <Span>제목</Span>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        <Span>내용</Span>
        <Div className="EditorBox">
          <PopupEditor
            editorRef={editorRef}
            initValue={add ? " " : data[index].content}
          />
        </Div>
      </Div>
    </Div>
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
  &.PopBottom {
    padding: 30px 40px;
    display: flex;
    flex-direction: column;
  }
  &.PopTop {
    width: 100%;
    padding: 25px 40px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #3d3f45;
  }
  &.EditorBox {
    margin: 25px 0;
  }
`;
const Span = styled.span`
  line-height: 1.46;
  color: #e5e8ea;
  font-size: 18px;
  font-weight: normal;

  &.Title {
    font-size: 26px;
    font-weight: bold;
  }
  &.BtnText {
    font-size: 15px;
    font-weight: 600;
  }
`;
const Input = styled.input`
   
    height: 52px;
    margin 20px 0;
    padding-left:10px;
    border-radius: 10px;
    border: solid 1px #3d3f45;
    background-color: #31333a;
    font-size: 15px;
    font-weight: normal;
    color:#e5e8ea;
    outline: none;
`;
const Btn = styled.button`
  &.PlusBtn {
    height: 40px;
    padding: 8px 19px;
    border-radius: 23px;
    background-color: #00abbf;
  }
`;

const Img = styled.img``;
