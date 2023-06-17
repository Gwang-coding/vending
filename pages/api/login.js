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
    const { id, pw } = req.body;
    const queryString = "SELECT * FROM user WHERE id = ? AND pw = ?";
    const values = [id, pw];
    const rows = await queryPromise(queryString, values);

    if (rows.length > 0) {
      // 입력한 ID와 비밀번호가 일치하는 경우
      const user = rows[0]; // 첫 번째 일치하는 데이터를 가져옴
      const response = { exists: true, user }; // Include { exists: true } and user data in the response
      res.status(200).json(response);
    } else {
      // 입력한 ID와 비밀번호가 일치하지 않는 경우
      res.status(401).send("Login failed");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}
