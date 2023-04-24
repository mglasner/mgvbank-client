export default async function handler(req, res) {
  const externalURL = process.env.EXTERNAL_API_URL;
  const response = await fetch(`${externalURL}`);
  res.send(await response.json());
}
