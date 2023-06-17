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

  let queryString = `INSERT INTO charge_log (date, userid, bank_name, how_buy, result, price) VALUES ('${data.date}', '${data.id}', '${data.bank_name}', '${data.how_buy}', '${data.result}', '${data.price}')`;

  try {
    const rows = await queryPromise(queryString);
    res.status(200).json({ exists: true });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}
