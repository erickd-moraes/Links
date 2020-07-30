// middleware responsável por validar os tokens e
// colocar na requisição qual o ID da account
const { verifyJwt } = require("../helpers/jwt");

const checkJwt = (req, res, next) => {

    // retirar rotas sign-in/sign-up da verificação do token
    const { url: path } = req;

    const excludedPaths = ["/auth/sign-in", "/auth/sign-up"];
    const isExclused = !!excludedPaths.find(p => p.startsWith(path));
    if (isExclused) return next();

    let token = req.headers["authorization"];
    token = token ? token.slice(7, token.length) : null;
    if (!token) {
        return res.jsonUnauthorized(null, "Invalid token");
    };

    try {
        const decoded = verifyJwt(token);
        req.accountId = decoded.id;
        next();
    } catch (error) {
        return res.jsonUnauthorized(null, "Invalid token");
    };
};

module.exports = checkJwt;