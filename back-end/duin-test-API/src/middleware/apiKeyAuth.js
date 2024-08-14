
function apiKeyAuth(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).send('API Key inválida o no proporcionada');
    }
    next();
}

module.exports = apiKeyAuth;
