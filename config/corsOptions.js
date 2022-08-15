// Cross Origin Resource Sharing
const whitelist = 
[
    'http://www.yoursite.com',
    'http://localhost:3500',
    'http://127.0.0.1:5500',
    'https://docs.atlas.mongodb.com/security-whitelist/'
]; // cors allows these url to access the database and stuff but not others

const corsOptions = 
{           // origin like google.com whoever reqested it
    origin: (origin, callback) =>
    {
        if (whitelist.indexOf(origin) !== -1 || !origin)
        {
            callback(null, true);
        }
        else
        {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};

module.exports = corsOptions;