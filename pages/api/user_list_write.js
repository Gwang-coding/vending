import mysql from "mysql";

const connection = mysql.createConnection({
  connectionLimit: 40,
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
  const data = req.body; // Assuming you pass the data array in the request body

  try {
    let queryString = `UPDATE user SET
      bank_name = '${data.bank_name}',
      block = '${data.block}',
      block_date = '${data.block_date}',
      block_memo = '${data.block_memo}',
      grade = '${data.grade}',
      join_date = '${data.join_date}',
      join_ip = '${data.join_ip}',
      memo = '${data.memo}',
      money = '${data.money}',
      pw = '${data.pw}',
      total_buy_money = '${data.total_buy_money}'
    WHERE id = '${data.id}'`;
    await queryPromise(queryString);

    res.status(200).json({ exists: true });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}
