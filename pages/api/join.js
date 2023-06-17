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

export default async function handler(req, res) {
  try {
    const { id, pw, join_date, join_ip } = req.body;
    const grade = "비구매자";
    const money = "0";
    const total_buy_money = "0";
    const bank_name = "";
    const block_memo = "";
    const memo = "";
    const total_money = "0";
    const block = "0";
    const block_date = "0";
    const queryString = `
    INSERT INTO user (id, pw, bank_name, grade, join_date, money, total_buy_money, join_ip, block, block_memo, block_date, memo, total_money)
    VALUES ('${id}', '${pw}', '${bank_name}', '${grade}', '${join_date}', '${money}', '${total_buy_money}', '${join_ip}', '${block}', '${block_memo}', '${block_date}', '${memo}', '${total_money}')
  `;
    await queryPromise(queryString);
    res.status(200).json({ exists: true });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}
