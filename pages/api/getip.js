import axios from "axios";

export default async function handler(req, res) {
  try {
    const rows = await axios.get("https://ipinfo.io/").then((res) => {
      return res.data;
    });
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}
