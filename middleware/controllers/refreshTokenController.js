
const jwt = require('jsonwebtoken');


const handleRefreshToken = (req, res) =>
{
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(403); // Forbidden
    // evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) =>
        {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const role = Object.values(foundUser.role);
            const accessToken = jwt.sign(
                { 
                    "UserInfo": 
                    {
                        "username": decoded.username,
                        "role": role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );
            res.json({ accessToken });
        }
    );
}

module.exports = { handleRefreshToken };