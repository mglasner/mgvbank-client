export default async function handler(req, res) {
  const externalURL = process.env.EXTERNAL_API_URL;

  if (req.method === "POST") {
    const { name, email } = req.body;

    const response = await fetch(`${externalURL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    res.send(response.json());
  } else {
    const response = await fetch(`${externalURL}`);
    res.send(await response.json());
  }
}
