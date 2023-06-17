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
    let clearQuery = `DELETE FROM category`;
    await queryPromise(clearQuery);

    // Insert the new data from the array
    for (const [index, item] of data.entries()) {
      let queryString = `INSERT INTO category (id, title, no) VALUES ('${item.id}', '${item.title}', '${index}')`;
      await queryPromise(queryString);
    }

    res.status(200).json({ exists: true });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}
