const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./user_database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the user_database database.');
});

db.run(`CREATE TABLE IF NOT EXISTS users (
  username TEXT PRIMARY KEY,
  email TEXT NOT NULL
)`, (err) => {
    if (err) {
        console.error(err.message);
    }
});

const createUser = (username) => {
    db.run('INSERT INTO users (username, email) VALUES (?, ?)', [username, email], (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log(`User ${username} inserted into the database.`);
    });
}

const updateUser = (username, email) => {
    db.run('UPDATE users SET email = ? WHERE username = ?', [email, username], (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log(`User ${username} updated in the database.`);
    });
}

const getUser = (username) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
            if (err) {
                reject(err.message);
            } else {
                resolve(row);
            }
        });
    });
};

module.exports = {
    createUser,
    updateUser,
    getUser
}
