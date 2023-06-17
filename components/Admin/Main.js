import styled from "styled-components";
import { addCommas } from "../../functions/addCommas";

export default function Main({ data }) {
  return (
    <>
      <Div className="UserBox">
        <Div className="user" shadow="#8c81ff" backgroundColor="#584cdb">
          <Div className="Rectangle-Copy-12" backgroundColor="#554ad1">
            <Img
              src="/assets/images/icon-user-white.png"
              className="iconuserwhite30-copy-2"
            ></Img>
          </Div>
          <Div className="main_textbox">
            <Span>총 유저</Span>
            <Span className="Member">{data.total_user}명</Span>
          </Div>
        </Div>
        <Div className="user" shadow="#3b7ee9" backgroundColor="#5f80b5">
          <Div className="Rectangle-Copy-12" backgroundColor="#5393f8">
            <Img
              src="/assets/images/icon-user-white.png"
              className="iconuserwhite30-copy-2"
            />
          </Div>
          <Div className="main_textbox">
            <Span>구매한 유저</Span>
            <Span className="Member">{data.total_buyer}명</Span>
          </Div>
        </Div>
        <Div className="user" shadow="#8bf3ff" backgroundColor="#55848a">
          <Div className="Rectangle-Copy-12" backgroundColor="#22b4c6">
            <Img
              src="/assets/images/icon-user-white.png"
              className="iconuserwhite30-copy-2"
            />
          </Div>
          <Div className="main_textbox">
            <Span>신규 유저</Span>
            <Span className="Member">{data.today_user}명</Span>
          </Div>
        </Div>
        <Div className="user" shadow="#ffb695" backgroundColor="#e18a62">
          <Div className="Rectangle-Copy-12" backgroundColor="#fc9d72">
            <Img
              src="/assets/images/icon-user-white.png"
              className="iconuserwhite30-copy-2"
            />
          </Div>
          <Div className="main_textbox">
            <Span>비구매 유저</Span>
            <Span className="Member">
              {data.total_user - data.total_buyer}명
            </Span>
          </Div>
        </Div>
      </Div>
      <Div className="UserBox">
        <Div className="PriceBoxWrapper">
          <Div className="main_textbox">
            <Span>당일 충전금액</Span>
            <Span className="Price">
              {addCommas(data.today_charge === null ? 0 : data.today_charge)}원
            </Span>
            <Div className="Line" />
            <Span>당일 구매금액</Span>
            <Span className="Price">
              {addCommas(data.today_buy === null ? 0 : data.today_buy)}원
            </Span>
            <Div className="Line" />
            <Span>당일 구매차익</Span>
            <Span className="Price">
              {addCommas(data.today_profit === null ? 0 : data.today_profit)}원
            </Span>
          </Div>
        </Div>
        <Div className="PriceBoxWrapper">
          <Div className="main_textbox">
            <Span>이번주 충전금액</Span>
            <Span className="Price">
              {addCommas(data.week_charge === null ? 0 : data.week_charge)}원
            </Span>
            <Div className="Line" />
            <Span>이번주 구매금액</Span>
            <Span className="Price">
              {addCommas(data.week_buy === null ? 0 : data.week_buy)}원
            </Span>
            <Div className="Line" />
            <Span>이번주 구매차익</Span>
            <Span className="Price">
              {addCommas(data.week_profit === null ? 0 : data.week_profit)}원
            </Span>
          </Div>
        </Div>
        <Div className="PriceBoxWrapper">
          <Div className="main_textbox">
            <Span>이번달 충전금액</Span>
            <Span className="Price">
              {addCommas(data.month_charge === null ? 0 : data.month_charge)}원
            </Span>
            <Div className="Line" />
            <Span>이번달 구매금액</Span>
            <Span className="Price">
              {addCommas(data.month_buy === null ? 0 : data.month_buy)}원
            </Span>
            <Div className="Line" />
            <Span>이번달 구매차익</Span>
            <Span className="Price">
              {addCommas(data.month_profit === null ? 0 : data.month_profit)}원
            </Span>
          </Div>
        </Div>
        <Div className="RankingBoxWrapper">
          <Div className="RankingBox">
            <Span className="Ranking">회원순위</Span>
          </Div>
          <Div className="accuBar">
            <Span className="accum">누적</Span>
          </Div>
          <Div className="RankingBox">
            {data.user_rank.map((item, index) => {
              return (
                <Div className="Ranking" key={index}>
                  <Span className="Ranking_text">{item.id}</Span>
                  <Span className="Ranking_text">
                    {addCommas(item.total_buy_money)}
                  </Span>
                </Div>
              );
            })}
          </Div>
        </Div>
      </Div>
    </>
  );
}
const Div = styled.div`
  &.UserBox {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    width: 100%;
  }
  &.user {
    width: 23%;
    height: 130px;
    display: flex;
    align-items: center;
    padding-left: 30px;
    border-radius: 20px;
    box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.4),
      inset 0 1px 2px 0 ${(props) => props.shadow};
    background-image: radial-gradient(
      circle at 103% -9%,
      ${(props) => props.backgroundColor},
      #272a31 34%
    );
  }
  &.Rectangle-Copy-12 {
    width: 56px;
    height: 56px;
    margin: 4px 20px 0 0;
    padding: 13px;
    border-radius: 20px;
    background-color: ${(props) => props.backgroundColor};
  }

  &.main_textbox {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  &.PriceBoxWrapper {
    width: 23%;
    display: flex;
    flex-direction: column;
    padding: 93px 40px;
    border-radius: 16px;
    background-color: #272a31;
  }
  &.Line {
    width: 100%;
    height: 1px;
    margin: 80px 0;
    background-color: #3d3f45;
  }
  &.RankingBoxWrapper {
    width: 23%;
    padding: 30px 0 35px 0;
    border-radius: 20px;
    background-color: #272a31;
  }
  &.accuBar {
    width: 100%;
    height: 50px;
    margin: 1px 0 0;
    padding: 11px 26px 11px 25px;
    background-color: #31333a;
    text-align: center;
    margin-bottom: 20px;
  }
  &.RankingBox {
    display: flex;
    flex-direction: column;
    margin: 0 25px 15px 25px;
  }
  &.Ranking {
    display: flex;
    width: 100%;
  }
`;
const Span = styled.span`
  line-height: 1.56;
  font-size: 18px;
  color: #e5e8ea;
  font-weight: normal;

  &.Member {
    font-size: 22px;
    font-weight: 500;
  }
  &.Price {
    font-size: 24px;
    color: #3dc5d6;
    font-weight: 500;
  }
  &.Ranking {
    font-size: 22px;
    font-weight: bold;
  }
  &.accum {
    weight: bold;
  }
  &.Ranking_text {
    width: 50%;
    text-align: center;
    margin-bottom: 20px;
    font-size: 15px;
    text-align: center;
    color: #e5e8ea;
  }
`;
const Img = styled.img`
  iconuserwhite30-copy-2 {
    width: 30px;
    height: 30px;
    object-fit: contain;
  }
`;
