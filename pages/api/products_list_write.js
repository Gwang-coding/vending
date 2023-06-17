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
    // Clear the existing data in the table
    let clearQuery = `DELETE FROM products`;
    await queryPromise(clearQuery);

    // Insert the new data from the array
    for (const [index, item] of data.entries()) {
      let queryString = `INSERT INTO products (id, title, \`dec\`, category, price1, price2, price3, amount1, amount2, amount3, \`patch\`, \`sell\`, thumbnail, video, day1, day2, day3, original1, original2, original3, content, reseller) VALUES ('${
        index + 1
      }', '${item.title}', '${item.dec}', '${item.category}', '${
        item.price1
      }', '${item.price2}', '${item.price3}', '${item.amount1}', '${
        item.amount2
      }', '${item.amount3}', '${item.patch}', '${item.sell}', '${
        item.thumbnail
      }', '${item.video}', '${item.day1}', '${item.day2}', '${item.day3}', '${
        item.original1
      }', '${item.original2}', '${item.original3}', '${item.content}', '${
        item.reseller
      }')`;
      await queryPromise(queryString);
    }

    res.status(200).json({ exists: true });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}
