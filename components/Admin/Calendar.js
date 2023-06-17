import React, { useState, forwardRef } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

export default function Calendar({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) {
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <Div className="example-custom-input" onClick={onClick} ref={ref}>
      {value} <Img src="/assets/images/icon-calendar.png"></Img>
    </Div>
  ));
  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        locale={ko}
        dateFormat="yyyy-MM-dd"
        customInput={<ExampleCustomInput />}
      />
      <P>-</P>
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        maxDate={startDate}
        locale={ko}
        dateFormat="yyyy-MM-dd"
        customInput={<ExampleCustomInput />}
      />
    </>
  );
}

const Div = styled.div`
  &.example-custom-input {
    width: 100%;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    border-radius: 10px;
    border: solid 1px #3d3f45;
    background-color: #31333a;
    color: #e5e8ea;
    cursor: pointer;
  }
`;
const P = styled.p`
  color: #e5e8ea;
  margin: 20px;
`;
const Img = styled.img``;
