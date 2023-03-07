const { comparePassword } = require('./bcryptService');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const USER_FILE = path.join(__dirname, '..', 'db', 'users.json');
const JWT_SECRET = process.env.JWT_SECRET;

const checkUserLogin = async(userName, password) => {
    try {
        const users = JSON.parse(fs.readFileSync(USER_FILE, 'utf-8'));
        const user = users.find((user) => user.userName === userName);
        if (!user) {
            return { isMatched: false, isSuccess: true };
        }
        const isPasswordMatch = await comparePassword(password, user.password);
        if (!isPasswordMatch) {
            return { isMatched: false, isSuccess: true };
        }
        const token = jwt.sign({ id: user.id, userName: user.userName }, JWT_SECRET, { expiresIn: '1h' });
        return { token, isMatched: true, isSuccess: true };
    } catch (e) {
        console.log(`[authService] Error occurred while matchng user password. username: ${userName} ${e}`)
        return { isSuccess: false };
    }
}

module.exports = {
    checkUserLogin
}