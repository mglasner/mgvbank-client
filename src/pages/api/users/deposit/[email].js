export default async function handler(req, res) {
  const { email } = req.query;
  const { deposit } = req.body;
  const externalURL = process.env.EXTERNAL_API_URL;
  const response = await fetch(`${externalURL}/deposit/${email}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ deposit }),
  });
  res.send(await response.json());
}
