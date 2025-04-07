import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method allowed" });
  }

  const accessKey = process.env.ACCESS_KEY;
  const secretKey = process.env.SECRET_KEY;
  const appKey = process.env.APP_KEY;

  try {
    const response = await axios.post("https://api.wfirma.pl/warehouse_documents", req.body, {
      headers: {
        accessKey,
        secretKey,
        appKey,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });

    res.status(200).json({ status: "success", data: response.data });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
      details: error.response?.data || null
    });
  }
}
