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
  const data = req.body; // Assuming you pass the data array in the request body

  try {
    let queryString = `UPDATE user SET block = '1', block_memo = '${data.memo}', block_date = '${data.date}' WHERE join_ip = '${data.ip}'`;
    await queryPromise(queryString);

    res.status(200).json({ exists: true });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}
