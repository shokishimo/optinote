const User = require('../../model/User');
const bcrypt = require('bcrypt');
const authController = require('../controllers/authController');

const handleNewUser = async (req, res) =>
{
    const { email, password, username } = req.body;
    if (!username || !password || !email) return res.status(400).json({ 'message': 'username, password, and email are required.'});
    
    // check for duplicate usernames in the database
    const duplicate = await User.findOne({ username: username}).exec();
    if (duplicate) return res.sendStatus(409); // there is already a user with the username passed in
    
    try
    {
        // encrypt the password
        const hashedPwd = await bcrypt.hash(password, Math.floor(Math.random() * 10)+1);
         
        // create and store the new user in MongoDB
        const result = await User.create(
        {
            "username": username,
            "password": hashedPwd,
            "email": email
        });

        console.log(result);
        res.status(201).json({ 'success': `New user ${username} created!` });
        req.body = { username, password };
        authController.handleLogin(req , res);
    }
    catch (err)
    {
        res.status(500).json({ 'message': err.message });
    }
};

module.exports = { handleNewUser };