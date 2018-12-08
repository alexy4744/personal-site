// https://developer.github.com/webhooks/securing/
const crypto = require("crypto");

module.exports = (req, res, next) => {
  const signature = req.get("x-hub-signature");
  if (!signature) return res.status(400);

  const payload = JSON.stringify(req.body);
  const digested = `sha1=${crypto.createHmac("sha1", process.env.SECRET_TOKEN).update(payload).digest("hex")}`;

  try {
    const isGitHub = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digested));
    if (!isGitHub) return res.status(400);
    return next();
  } catch (_) {
    return res.status(400);
  }
};