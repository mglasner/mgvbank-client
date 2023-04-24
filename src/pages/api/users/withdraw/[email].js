export default async function handler(req, res) {
  const { email } = req.query;
  const { withdraw } = req.body;
  const externalURL = process.env.EXTERNAL_API_URL;
  const response = await fetch(`${externalURL}/withdraw/${email}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ withdraw }),
  });
  res.send(await response.json());
}
