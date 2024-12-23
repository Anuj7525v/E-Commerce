const jwt = require('jsonwebtoken');

const generateToken  = (res,userId) => {
    const token = jwt.sign({userId},'secret',{
        expiresIn:'30d',
    });

    res.cookies('jwt',token,{
        httpOnly:true,
      //  secure:
      sameSite:'strict',
      maxAge: 30*24*60*60*1000,
    });
    return token;

} ;

module.exports = generateToken;