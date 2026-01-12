const colorModel = require("../../models/color")
var jwt = require('jsonwebtoken');
var secretKey = '1234567890';

const bcrypt = require('bcrypt');
const userModel = require("../../models/user");
const saltRounds = 10;
const nodemailer = require("nodemailer");

exports.register = async (request, response) => {

    var userCheck = await userModel.findOne({
        email: request.body.email,
        deleted_at: null,
        role_type: 'user'
    })

    if (userCheck) {
        const data = {
            _status: false,
            _message: 'Email id already exit !'
        }
        response.send(data);
    }

    var dataSave = request.body;


    if (request.body.password != '') {
        dataSave.password = await bcrypt.hash(request.body.password, saltRounds);
    }

    userModel(dataSave).save()
        .then((result) => {

            var token = jwt.sign({ userInfo: result }, secretKey);

            const data = {
                _status: true,
                _message: 'Register Succussfully !',
                _token: token,
            }
            response.send(data);

        })
        .catch(() => {
            const data = {
                _status: false,
                _message: 'Something went wrong !'
            }
            response.send(data);
        })
};

exports.login = async (request, response) => {

    var userCheck = await userModel.findOne({
        email: request.body.email,
        deleted_at: null,
        role_type: 'user'
    })

    if (!userCheck) {
        const data = {
            _status: false,
            _message: 'Email id not valid !'
        }
        response.send(data);
    }

    var checkpassword = await bcrypt.compare(request.body.password, userCheck.password);

    if (!checkpassword) {
        const data = {
            _status: false,
            _message: 'password is incorrect !'
        }
        response.send(data);
    }

    if (userCheck.status == 0) {
        const data = {
            _status: false,
            _message: 'Your account is deactivated. Please contact support !'
        }
        response.send(data);
    }

    var token = jwt.sign({ userInfo: userCheck }, secretKey);

    const data = {
        _status: true,
        _message: 'Login Succussfully !',
        _token: token,
        _user: userCheck
    }
    response.send(data);

};

exports.viewProfile = async (request, response) => {

    var token = request.headers.authorization;
    var token = token.split(' ');

    try {
        var decoded = jwt.verify(token[1], secretKey);
    } catch (error) {
        const data = {
            _status: false,
            _message: 'Something went wrong !!',
            _data: ''
        }

        response.send(data);
    }

    userModel.findOne({
        _id: decoded.userInfo._id,
        deleted_at: null,
        role_type: 'user'
    })
        .then((result) => {
            if (result) {
                const data = {
                    _status: true,
                    _message: 'profile fetch succussfully.',
                    _data: result
                }

                response.send(data);
            } else {
                const data = {
                    _status: false,
                    _message: 'No record found.',
                    _data: result
                }

                response.send(data);
            }
        })
        .catch((getError) => {

            const data = {
                _status: false,
                _message: 'Something went wrong !!',
                _data: ''
            }

            response.send(data);
        })
};

exports.updateProfile = async (request, response) => {
    var token = request.headers.authorization;
    var token = token.split(' ');

    try {
        var decoded = jwt.verify(token[1], secretKey);
    } catch (error) {
        const data = {
            _status: false,
            _message: 'Something went wrong !!',
            _data: ''
        }

        response.send(data);
    }

    var dataSave = request.body;
    dataSave.updated_at = Date.now()

    userModel.updateOne({
        _id: decoded.userInfo._id
    }, {
        $set: dataSave
    })
        .then((result) => {
            if (result.matchedCount > 0) {
                const data = {
                    _status: true,
                    _message: 'Profile update succussfully.',
                    _data: result
                }

                response.send(data);
            } else {
                const data = {
                    _status: false,
                    _message: 'No record found.',
                    _data: null
                }

                response.send(data);
            }

        })
        .catch((getError) => {
            const data = {
                _status: false,
                _message: 'Something went wrong !!',
                _data: ''
            }

            response.send(data);
        })
};

exports.changePassword = async (request, response) => {
    var token = request.headers.authorization;
    var token = token.split(' ');

    try {
        var decoded = jwt.verify(token[1], secretKey);
    } catch (error) {
        const data = {
            _status: false,
            _message: 'Something went wrong !!',
            _data: ''
        }

        response.send(data);
    }

    var userInfo = await userModel.findById(decoded.userInfo._id);

    var passwordVirefy = await bcrypt.compare(request.body.current_password, userInfo.password);

    if (!passwordVirefy) {
        const data = {
            _status: false,
            _message: 'Current password is incorrect !!',
            _data: ''
        }

        response.send(data);
    }

    if (request.body.new_password != request.body.confirm_password) {
        const data = {
            _status: false,
            _message: 'New password and confirm password must be same !!',
            _data: ''
        }

        response.send(data);
    }

    if (request.body.new_password == request.body.current_password) {
        const data = {
            _status: false,
            _message: 'New password and current password cannot be same !!',
            _data: ''
        }

        response.send(data);
    }

    var dataSave = {};

    dataSave.password = await bcrypt.hash(request.body.new_password, saltRounds);

    dataSave.updated_at = Date.now()


    userModel.updateOne({
        _id: decoded.userInfo._id
    }, {
        $set: dataSave
    })
        .then((result) => {
            if (result.matchedCount > 0) {
                const data = {
                    _status: true,
                    _message: 'Change password succussfully.',
                    _data: result
                }

                response.send(data);
            } else {
                const data = {
                    _status: false,
                    _message: 'No record found.',
                    _data: null
                }

                response.send(data);
            }

        })
        .catch((getError) => {
            const data = {
                _status: false,
                _message: 'Something went wrong !!',
                _data: ''
            }

            response.send(data);
        })

};

exports.forgotPassword = async (request, response) => {
    var userCheck = await userModel.findOne({
        email: request.body.email,
        deleted_at: null,
        role_type: 'user'
    })

    if (!userCheck) {
        const data = {
            _status: false,
            _message: 'Email id is incorrect !'
        }
        response.send(data);
    }

    const token = jwt.sign({ id: userCheck._id }, process.env.secret_key, { expiresIn: '1h' });

    // Create transporter (configure environment variables for Email and GMAIL_Password)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.Email,
            pass: process.env.GMAIL_Password,
        },
    });

    var resetUrl = `${process.env.resetUrl}${token}`

    const htmlMessage = `
                <div style="font-family: Arial, sans-serif; line-height:1.6; color:#222;">
                  <h2 style="color:#333;">Reset your password</h2>
                  <p>Hi ${userCheck.name || userCheck.email},</p>
                  <p>We received a request to reset the password for your account. Click the button below to choose a new password. This link will expire in 1 hour.</p>
                  <p><a href="${resetUrl}" style="background:#1a73e8;color:#ffffff;padding:10px 16px;border-radius:4px;text-decoration:none;display:inline-block;">Reset Password</a></p>
                  <p>If you didn't request a password reset, you can safely ignore this email and your password will remain unchanged.</p>
                  <p>Thanks,<br/>Support Team</p>
                </div>
            `;

    transporter.sendMail({
        from: `"Monsta" <${process.env.Email}>`,
        to: userCheck.email,
        subject: 'Reset your password',
        html: htmlMessage,
    })
        .then(() => {
            const data = {
                _status: true,
                _message: 'Email send succussfully !'
            }
            response.send(data);
        })
        .catch(() => {
            const data = {
                _status: false,
                _message: 'Something went wrong !'
            }
            response.send(data);
        })

};

exports.resetPassword = async (request, response) => {
    var token = request.body.token;

    try {
        var decoded = jwt.verify(token, secretKey);
    } catch (error) {
        const data = {
            _status: false,
            _message: 'Something went wrong !!',
            _data: ''
        }

        response.send(data);
    }

    if (request.body.new_password != request.body.confirm_password) {
        const data = {
            _status: false,
            _message: 'New password and confirm password must be same !!',
            _data: ''
        }

        response.send(data);
    }

    var dataSave = {};
    dataSave.password = await bcrypt.hash(request.body.new_password, saltRounds);
    dataSave.updated_at = Date.now()

    userModel.updateOne({
        _id: decoded.id
    }, {
        $set: dataSave
    })
    .then((result) => {
        if (result.matchedCount > 0) {
            const data = {
                _status: true,
                _message: 'Reset password succussfully.',
                _data: result
            }

            response.send(data);
        } else {
            const data = {
                _status: false,
                _message: 'No record found.',
                _data: null
            }

            response.send(data);
        }

    })
    .catch((getError) => {
        const data = {
            _status: false,
            _message: 'Something went wrong !!',
            _data: ''
        }

        response.send(data);
    })
};