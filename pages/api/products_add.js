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
    let queryString = `INSERT INTO products (id, title, \`dec\`, category, price1, price2, price3, amount1, amount2, amount3, \`patch\`, \`sell\`, thumbnail, video, day1, day2, day3, original1, original2, original3, content, reseller) VALUES (${data.id}, '${data.title}', '${data.dec}', '${data.category}', '${data.price1}', '${data.price2}', '${data.price3}', '${data.amount1}', '${data.amount2}', '${data.amount3}', '${data.patch}', '${data.sell}', '${data.thumbnail}', '${data.video}', '${data.day1}', '${data.day2}', '${data.day3}', '${data.original1}', '${data.original2}', '${data.original3}', '${data.content}', '${data.reseller}')`;
    await queryPromise(queryString);

    res.status(200).json({ exists: true });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}
