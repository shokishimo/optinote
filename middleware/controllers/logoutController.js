const mongoose = require('mongoose');

const handleLogout = async (req, res) =>
{
    // On client, also delete the accessToken in the memory of frontend application
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content
    const refreshToken = cookies.jwt;

    // Is refreshToken i DB
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) 
    {
        res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.sendStatus(204);
    }
    
    // Delete refreshToken in DB
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = {...foundUser, refreshToken: ''};
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
        path.join(__dirname, '..', '..', 'data', 'users.json'),
        JSON.stringify(usersDB.users)
    );

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 }); // add 'secure: true' - only serves on https
};

module.exports = { handleLogout };