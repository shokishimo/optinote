function checkSignUpParams()
{
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    if (!username || !password || !email)
    {
        return false;
    }
    else
    {
        return true;
    }
}