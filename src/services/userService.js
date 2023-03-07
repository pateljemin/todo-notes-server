const { getEncyptedPassword } = require('./bcryptService');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const USER_FILE = path.join(__dirname, '..', 'db', 'users.json');

const createUser = async(userName, password) => {
    try {
        const users = JSON.parse(await fs.readFileSync(USER_FILE, 'utf-8'));
        const userExists = users.some((user) => user.userName === userName);
        if (userExists) {
            return { userExists: true, isSuccess: true };
        }
        const hasedPassword = await getEncyptedPassword(password);
        const newUser = { id: uuidv4(), userName, password: hasedPassword };
        users.push(newUser);
        fs.writeFileSync(USER_FILE, JSON.stringify(users));
    } catch (e) {
        console.log(`[userService] Error occurred while creating user. ${e}`)
        return { isSuccess: false }
    }

    return { userExists: false, isSuccess: true };
}

module.exports = {
    createUser
}