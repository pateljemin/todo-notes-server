const bcrypt = require('bcryptjs');

const saltRounds = process.env.SALT_ROUND || 10;

const getEncyptedPassword = async(password) => {
    const salt = await bcrypt.genSalt(Number(saltRounds));
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

const comparePassword = async(password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}

module.exports = {
    getEncyptedPassword,
    comparePassword
}