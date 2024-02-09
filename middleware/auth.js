const jwt = require('jsonwebtoken');


class AuthMiddleware {
    async checkToken(req, res, next) {
        try {
            console.log('going', req.headers);
            const token = req.headers.authorization
            const verifiedTokenDetails = jwt.verify(
                token || "",
                `${process.env.SECRET_KEY}`
              );
              console.log(verifiedTokenDetails);
              req.authUser = verifiedTokenDetails;
              console.log('fgnjghghmmghm',req.authUser);
              next();
        } catch (err) {
         
              return res.status(400).json({error : req.t("TOKEN_EXPIRED")});
        }
    }
}

module.exports = AuthMiddleware;