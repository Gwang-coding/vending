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
  const data = req.body;

  try {
    let queryString = `UPDATE charge_log SET result = 'success' WHERE id = '${data.index}';`;
    const rows = await queryPromise(queryString);
    let queryString2 = `UPDATE user SET total_money = CONCAT(CAST(total_money AS UNSIGNED) + ${data.price}), money = CONCAT(CAST(money AS UNSIGNED) + ${data.price}) WHERE id = '${data.id}';`;
    const rows2 = await queryPromise(queryString2);
    res.status(200).json({ exists: true });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}
