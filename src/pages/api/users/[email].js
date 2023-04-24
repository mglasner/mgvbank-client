export default async function handler(req, res) {
  const { email } = req.query;
  const externalURL = process.env.EXTERNAL_API_URL;
  const response = await fetch(`${externalURL}/email/${email}`);
  res.send(await response.json());
}
