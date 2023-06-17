import mysql from "mysql";

const connection = mysql.createConnection({
  connectionLimit: 20,
  host: "mydbs.coaunxyvwerk.ap-northeast-2.rds.amazonaws.com",
  user: "admin",
  password: "admin2023",
  database: "mydb",
});

function queryPromise(queryString) {
  return new Promise((resolve, reject) => {
    connection.query(queryString, (error, results) => {
      // 연결 해제
      if (error) {
        return reject(error);
      }
      resolve(results);
    });

    // 연결 해제
  });
}

function getLastDayOfMonth(date) {
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return String(nextMonth.getDate()).padStart(2, "0");
}

function getWekkend() {
  var currentDay = new Date();
  var theYear = currentDay.getFullYear();
  var theMonth = currentDay.getMonth();
  var theDate = currentDay.getDate();
  var theDayOfWeek = currentDay.getDay();

  var thisWeek = [];

  for (var i = 0; i < 7; i++) {
    var resultDay = new Date(theYear, theMonth, theDate + (i - theDayOfWeek));
    var yyyy = resultDay.getFullYear();
    var mm = Number(resultDay.getMonth()) + 1;
    var dd = resultDay.getDate();

    mm = String(mm).length === 1 ? "0" + mm : mm;
    dd = String(dd).length === 1 ? "0" + dd : dd;

    thisWeek[i] = dd;
  }

  return thisWeek;
}
export default async function handler(req, res) {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const _today = {
    start: `${year}-${month}-${day} 00:00:00`,
    end: `${year}-${month}-${day} 23:59:59`,
  };

  const _week = {
    start: `${year}-${month}-${getWekkend()[0]} 00:00:00`,
    end: `${year}-${month}-${getWekkend()[6]} 23:59:59`,
  };

  const _month = {
    start: `${year}-${month}-01 00:00:00`,
    end: `${year}-${month}-${getLastDayOfMonth(date)} 23:59:59`,
  };

  let queryString = `SELECT 
    (SELECT COUNT(*) FROM user) AS total_user,
    (SELECT COUNT(*) FROM user WHERE total_buy_money >= 0) AS total_buyer,
    (SELECT COUNT(*) FROM user WHERE join_date = '${year}-${month}-${day}') AS today_user,
    (SELECT SUM(price) FROM charge_log WHERE date BETWEEN '${_today.start}' AND '${_today.end}') AS today_charge,
    (SELECT SUM(price) FROM charge_log WHERE date BETWEEN '${_week.start}' AND '${_week.end}') AS week_charge,
    (SELECT SUM(price) FROM charge_log WHERE date BETWEEN '${_month.start}' AND '${_month.end}') AS month_charge,
    (SELECT SUM(price) FROM buy_log WHERE date BETWEEN '${_today.start}' AND '${_today.end}') AS today_buy,
    (SELECT SUM(price) FROM buy_log WHERE date BETWEEN '${_week.start}' AND '${_week.end}') AS week_buy,
    (SELECT SUM(price) FROM buy_log WHERE date BETWEEN '${_month.start}' AND '${_month.end}') AS month_buy,
    (SELECT SUM(price - original) FROM buy_log WHERE date BETWEEN '${_today.start}' AND '${_today.end}') AS today_profit,
    (SELECT SUM(price - original) FROM buy_log WHERE date BETWEEN '${_week.start}' AND '${_week.end}') AS week_profit,
    (SELECT SUM(price - original) FROM buy_log WHERE date BETWEEN '${_month.start}' AND '${_month.end}') AS month_profit;
`;

  try {
    const rows = await queryPromise(queryString);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}
