export default async function handler(req, res) {
  const { to, from, amount } = req.body;
  const externalURL = process.env.EXTERNAL_API_URL;
  const response = await fetch(`${externalURL}/transfer`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to, from, amount }),
  });
  res.send(await response.json());
}
