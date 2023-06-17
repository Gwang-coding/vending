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
    for (const item of data) {
      let queryString2 = `UPDATE user SET total_money = CONCAT(CAST(total_money AS UNSIGNED) + ${item.price}), money = CONCAT(CAST(money AS UNSIGNED) + ${item.price}) WHERE id = '${item.userid}';`;
      const rows2 = await queryPromise(queryString2);
    }
    let queryString = `UPDATE charge_log SET result = 'success' WHERE result = 'wait'`;
    const rows = await queryPromise(queryString);
    res.status(200).json({ exists: true });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}
