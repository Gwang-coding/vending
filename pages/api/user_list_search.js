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
  const { id } = req.query;

  let queryString = `SELECT * FROM user WHERE id = '${id}'`;

  try {
    const rows = await queryPromise(queryString);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}
