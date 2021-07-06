const { generateString } = require("../utils/randomString");

exports.createToken = (req, res, next) => {
    const ip = req.ip;
    const newToken = {
        ip,
        token: generateString() + ip
    }
    req.serverTokens.push(newToken);
    if (req.serverTokens.length > 25){
      req.serverTokens.shift();
    }
    res.cookie('kclsutoken', newToken, { maxAge: 900000 });
    res.status(200).send(newToken);
}
