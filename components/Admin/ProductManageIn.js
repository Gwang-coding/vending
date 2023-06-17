import styled from "styled-components";
import dynamic from "next/dynamic";
const ProductEditor = dynamic(() => import("../Editor/ProductEditor"), {
  ssr: false,
});
import { useState, useRef } from "react";
import axios from "axios";
export default function ProdectManageIn({
  _category,
  data,
  setData,
  setAdd,
  modifyIndex,
}) {
  const editorRef = useRef();
  const [info, setInfo] = useState(
    modifyIndex === -1
      ? {
          id: parseInt(data[data.length - 1].id) + 1,
          title: "",
          dec: "",
          category: "",
          price1: "",
          price2: "",
          price3: "",
          amount1: "",
          amount2: "",
          amount3: "",
          patch: "0",
          sell: "0",
          thumbnail: "",
          video: "",
          day1: "",
          day2: "",
          day3: "",
          original1: "",
          original2: "",
          original3: "",
          content: "",
          reseller: "0",
        }
      : data[modifyIndex]
  );
  const [cat, setCat] = useState(false);

  const onSvae = async () => {
    if (modifyIndex === -1) {
      const _data = [...data, info];
      setData(_data);
      await axios.post("http://localhost:3000/api/products_add", info);
      setAdd(false);
    } else {
      const _data = data.map((item) => (item.id === info.id ? info : item));

      await axios.post("http://localhost:3000/api/products_modify", info);
      setData(_data);
      setAdd(false);
    }
  };

  const onDel = async () => {
    if (modifyIndex === -1) {
      setAdd(false);
    } else {
      const _data = data.filter((item) => item.id !== info.id);
      await axios.post("http://localhost:3000/api/products_del", info);
      setData(_data);
      setAdd(false);
    }
  };

  //값 변경
  const updateValue = (name, value) => {
    setInfo({ ...info, [name]: value });
  };

  return (
    <>
      <Div className="Container">
        <Div className="TopBox">
          <Span className="Title">
            {modifyIndex === -1 ? "상품 추가" : `상품 [${info.title}] 관리`}
          </Span>
          <Div>
            <Btn className="DelBtn" onClick={onDel}>
              <Span className="BtnText">삭제하기</Span>
            </Btn>
            <Btn className="SaveBtn" onClick={onSvae}>
              <Span className="BtnText">저장하기</Span>
            </Btn>
          </Div>
        </Div>
        <Div className="InfoBox">
          <Div className="Info">
            <Div className="WrapperBox" width="60%">
              <Div className="Wrapper">
                <Span>상품명</Span>
                <Input
                  className="ProductInput"
                  value={info.title}
                  onChange={(e) => updateValue("title", e.target.value)}
                />
              </Div>
              <Div className="Wrapper">
                <Span>간략한 설명</Span>
                <Input
                  className="ProductInput"
                  value={info.dec}
                  onChange={(e) => updateValue("dec", e.target.value)}
                />
              </Div>
              <Div className="Wrapper" onClick={() => setCat(!cat)}>
                <Span>카테고리</Span>
                <Div className="InputBox">
                  <Span className="InputText">{info.category}</Span>
                  <Img src="/assets/images/icon-a-right-gray.png" />
                </Div>
                {cat && (
                  <Div className="Dropdown">
                    {_category.map((itm, idx) => {
                      return (
                        <Span
                          className="dropdown"
                          key={idx}
                          onClick={() => {
                            updateValue("category", itm);
                            setCat(false);
                          }}
                        >
                          {itm}
                        </Span>
                      );
                    })}
                  </Div>
                )}
              </Div>
              <Div className="Wrapper">
                <Span>상품이미지 URL</Span>
                <Input
                  className="ProductInput"
                  value={info.thumbnail}
                  onChange={(e) => updateValue("thumbnail", e.target.value)}
                />
              </Div>
              <Div className="Wrapper">
                <Span>소개영상 URL</Span>
                <Input
                  className="ProductInput"
                  value={info.video}
                  onChange={(e) => updateValue("video", e.target.value)}
                />
              </Div>
            </Div>
            <Div className="WrapperBox" width="30%">
              <Div className="Wrapper">
                <Span>판매중지</Span>
                <Div
                  className={`Rectangle-Copy-2-${
                    info.sell === "0" ? "off" : "on"
                  }`}
                  onClick={() =>
                    updateValue("sell", info.sell === "0" ? "1" : "0")
                  }
                >
                  <Div className="Oval-Copy-2" />
                </Div>
              </Div>
              <Div className="Wrapper">
                <Span>패치중</Span>
                <Div
                  className={`Rectangle-Copy-2-${
                    info.patch === "0" ? "off" : "on"
                  }`}
                  onClick={() =>
                    updateValue("patch", info.patch === "0" ? "1" : "0")
                  }
                >
                  <Div className="Oval-Copy-2" />
                </Div>
              </Div>
              <Div className="Wrapper">
                <Span>리셀러에게만 판매</Span>
                <Div
                  className={`Rectangle-Copy-2-${
                    info.reseller === "0" ? "off" : "on"
                  }`}
                  onClick={() =>
                    updateValue("reseller", info.reseller === "0" ? "1" : "0")
                  }
                >
                  <Div className="Oval-Copy-2" />
                </Div>
              </Div>
            </Div>
          </Div>
          <Div className="Line" />
          <Div className="Top">
            <Span className="SubTitle">재고</Span>
          </Div>
          <Div className="Info">
            <Div className="Wrapper">
              <Div className="WrapperItem">
                <Span>첫번째</Span>
                <Textarea
                  placeholder="재고넣는 칸입니다."
                  value={info.amount1}
                  onChange={(e) => updateValue("amount1", e.target.value)}
                />
                <Input
                  type="number"
                  className="InvenInput"
                  placeholder="가격(숫자만 입력)"
                  value={info.price1}
                  onChange={(e) => updateValue("price1", e.target.value)}
                />
                <Input
                  className="InvenInput"
                  placeholder="단위"
                  value={info.day1}
                  onChange={(e) => updateValue("day1", e.target.value)}
                />
                <Input
                  className="InvenInput"
                  placeholder="원가"
                  value={info.original1}
                  onChange={(e) => updateValue("original1", e.target.value)}
                />
              </Div>
              <Div className="WrapperItem">
                <Span>두번째</Span>
                <Textarea
                  placeholder="재고넣는 칸입니다."
                  value={info.amount2}
                  onChange={(e) => updateValue("amount2", e.target.value)}
                />
                <Input
                  type="number"
                  className="InvenInput"
                  placeholder="가격(숫자만 입력)"
                  value={info.price2}
                  onChange={(e) => updateValue("price2", e.target.value)}
                />
                <Input
                  className="InvenInput"
                  placeholder="단위"
                  value={info.day2}
                  onChange={(e) => updateValue("day2", e.target.value)}
                />
                <Input
                  className="InvenInput"
                  placeholder="원가"
                  value={info.original2}
                  onChange={(e) => updateValue("original2", e.target.value)}
                />
              </Div>
              <Div className="WrapperItem">
                <Span>세번째</Span>
                <Textarea
                  placeholder="재고넣는 칸입니다."
                  value={info.amount3}
                  onChange={(e) => updateValue("amount3", e.target.value)}
                />
                <Input
                  type="number"
                  className="InvenInput"
                  placeholder="가격(숫자만 입력)"
                  value={info.price3}
                  onChange={(e) => updateValue("price3", e.target.value)}
                />
                <Input
                  className="InvenInput"
                  placeholder="단위"
                  value={info.day3}
                  onChange={(e) => updateValue("day3", e.target.value)}
                />
                <Input
                  className="InvenInput"
                  placeholder="원가"
                  value={info.original3}
                  onChange={(e) => updateValue("original3", e.target.value)}
                />
              </Div>
            </Div>
          </Div>
          <Div className="Top">
            <Span>제품소개</Span>
          </Div>
          <Div className="EditorBox">
            <ProductEditor
              editorRef={editorRef}
              initValue={info.content}
              updateValue={updateValue}
            />
          </Div>
        </Div>
      </Div>
    </>
  );
}

const Div = styled.div`
  &.Dropdown {
    position: absolute;
    margin-top: 30%;
    margin-left: 20%;
    width: 80%;
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
  }

  &.WrapperBox {
    margin-right: 5%;
    width: ${(props) => props.width};
  }
  &.InfoBox {
    width: 100%;
    padding: 0px 40px;
  }
  &.Info {
    display: flex;
    padding-top: 25px;
  }
  &.Wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    position: relative;
  }
  &.WrapperItem {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 500px;
    width: 30%;
  }
  &.EditorBox {
    margin: 25px 0;
  }
  &.InputBox {
    cursor: pointer;
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 52px;
    padding: 15px;
    border-radius: 10px;
    border: solid 1px #3d3f45;
    background-color: #31333a;
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
  &.Line {
    height: 1px;
    width: 100%;
    background-color: #393b44;
  }
`;
const Span = styled.span`
  font-size: 18px;
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
  &.InputText {
    font-size: 15px;
  }
  &.BtnText {
    font-size: 15px;
    font-weight: 600;
    color: #fff;
  }
  &.dropdown {
    cursor: pointer;
  }
`;
const Input = styled.input`
  &.ProductInput {
    height: 52px;
    width: 80%;
    border-radius: 10px;
    border: solid 1px #3d3f45;
    background-color: #31333a;
    padding: 10px;
    font-size: 15px;
    font-weight: normal;
    color: #e5e8ea;
    outline: none;
  }
  &.InvenInput {
    height: 52px;
    width: 100%;
    border-radius: 10px;
    border: solid 1px #3d3f45;
    background-color: #31333a;
    padding: 10px;
    font-size: 15px;
    font-weight: normal;
    color: #e5e8ea;
    outline: none;
    webkit-appearance: none;
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
  }
`;
const Textarea = styled.textarea`
  height: 250px;
  width: 100%;
  border-radius: 10px;
  border: solid 1px #3d3f45;
  background-color: #31333a;
  padding: 10px;
  font-size: 15px;
  font-weight: normal;
  color: #e5e8ea;
  outline: none;
  resize: none;
`;
const Btn = styled.button`
  &.DelBtn {
    height: 40px;
    padding: 8px 19px;
    border-radius: 23px;
    background-color: #474950;
  }
  &.SaveBtn {
    height: 40px;
    padding: 8px 19px;
    border-radius: 23px;
    background-color: #00abbf;
    margin-left: 10px;
  }
`;

const Img = styled.img``;
