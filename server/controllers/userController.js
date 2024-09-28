const sendToken = require('../middleware/sendToken');
const UserModel = require('../models/user');

exports.authenticate = async (req, res) => {
    const email_id = req?.body?.email_id
    let userInfo = await UserModel.findOne({ email_id })

    if (userInfo) {
        sendToken(userInfo, 201, res)
    } else {
        const user = new UserModel(req.body);
        userInfo = await user.save()
        sendToken(userInfo, 201, res)
    }
}

exports.getProfile = async (req, res) => {
    sendToken(req?.user, 200, res)
}