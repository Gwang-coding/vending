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
    let queryString = `UPDATE products SET 
    title = '${data.title}',
    \`dec\` = '${data.dec}',
    category = '${data.category}',
    price1 = '${data.price1}',
    price2 = '${data.price2}',
    price3 = '${data.price3}',
    amount1 = '${data.amount1}',
    amount2 = '${data.amount2}',
    amount3 = '${data.amount3}',
    \`patch\` = '${data.patch}',
    \`sell\` = '${data.sell}',
    thumbnail = '${data.thumbnail}',
    video = '${data.video}',
    day1 = '${data.day1}',
    day2 = '${data.day2}',
    day3 = '${data.day3}',
    original1 = '${data.original1}',
    original2 = '${data.original2}',
    original3 = '${data.original3}',
    content = '${data.content}',
    reseller = '${data.reseller}'
WHERE id = ${data.id}`;
    await queryPromise(queryString);

    res.status(200).json({ exists: true });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}
