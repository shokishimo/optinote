const User = require('../../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) =>
{
    const { username, pwd } = req.body;
    if (!username || !pwd) return res.status(400).json({ 'message': 'Username and password are required.'});
    const foundUser = User.findOne(person => person.username === username);
    if (!foundUser) return res.sendStatus(401); // Unauthorized: Never had the user
    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) 
    {
        // creat JWTs
        const accessToken = jwt.sign(
            { 
                "UserInfo": 
                {
                    "username": foundUser.username
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        
        // here save refresh token with current user in database
        foundUser.refreshToken = refreshToken;
        await foundUser.save();
        
        // want to store access token in memory
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
    }
    else
    {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };