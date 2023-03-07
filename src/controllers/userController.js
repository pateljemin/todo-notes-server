const { createUser } = require('../services/userService');

/**
 * Create a user.
 *
 * @param req : Http Request with user sign up data.
 * @param res : Http Response
 */
const signUp = async(req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const serviceStatus = await createUser(username, password);

    if (!serviceStatus.isSuccess) {
        return res.status(500).json({ message: 'Something went wrong on server side' })
    }

    if (serviceStatus && serviceStatus.userExists) {
        return res.status(409).json({ message: 'Username is already taken' });
    }

    res.status(200).json({ message: 'User created' });
};

module.exports = {
    signUp
}