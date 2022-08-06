

const apiKeyStr = process.env.ApiKey;

function staticAuth(req, res, next) {
  const token = req.header('x-auth-token');
  console.log(token)
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    if (token !== apiKeyStr) return res.status(401).send(`Access denied.`);

    next();
  }catch (ex) {
    res.status(400).send(ex.message);
  }
}
exports.staticAuth = staticAuth;