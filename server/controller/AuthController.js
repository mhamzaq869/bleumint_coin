const User = require('../models/user_model');
const bcrypt = require('bcryptjs');
const { Redirect } = require('react-router-dom');
const Axios = require('axios');
const asyncHandler = require('../middlewares/AsyncHandler');
const config = require('../../config');
const path = require('path');
const Token = require('../models/token');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

exports.SignupUser = async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  User.findOne({ email: email }).then(user => {
    if (user) {
      return res.send({ result: 'already exist' });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password,
    });

    const token = new Token({
      userId: newUser._id,
      token: crypto.randomBytes(32).toString('hex'),
    });

    const url = `${config.SITE_URL}email/${newUser._id}/verify/${token.token}`;
    token.save();

    sendEmail(newUser.email, 'Verify Email', url);

    bcrypt.genSalt(12, (err, salt) =>
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(res.send({ result: 'success' }))
          .catch(err => console.log(err));
      }),
    );
  });

  // if(req.file){
  //   const avatar = req.file;
  //   path = 'client/public/avatar/' + name + '_' + Date.now() + avatar.originalname.replace(/(.*)([.][^.]*)/, function(a,b,c){return c});

  //   try {
  //     fs.writeFileSync(path, avatar.buffer);
  //   } catch (err) {
  //     return console.log(err);
  //   }
  // }
};

exports.LoginUser = async (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then(user => {
    if (!user) return res.send({ result: 'Not Register User' });

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.send({ result: 'Incorrect password' });

      console.log(user.verified);
      if (!user.verified) {
        Token.findOne({ userId: user._id }).then(token => {
          if (token) token.remove();

          token = new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString('hex'),
          });

          const url = `${config.SITE_URL}email/${user._id}/verify/${
            token.token
          }`;

          token.save();
          sendEmail(user.email, 'Verify Email', url);

          return res.send({
            result: 'Unverified',
          });
        });
      } else {
        return res.send({ result: 'Login Success', userdata: user }); // sends cookie with sessionID automatically in response
      }
    });
  });
};

exports.Upload_NID = asyncHandler(async (req, res) => {
  if (!req.files) {
    res.send('File was not found');
    return;
  }

  const id = req.params.id;
  front_image = req.files.front;
  back_image = req.files.back;

  if (
    !front_image.mimetype.startsWith('image') ||
    !back_image.mimetype.startsWith('image')
  ) {
    return res.send({ result: 'Please uplaod an image' });
  }

  if (
    front_image.size > config.MAX_FILE_SIZE ||
    back_image.size > config.MAX_FILE_SIZE
  ) {
    return next(
      new ErrorResponse(
        `Please upload an photo of less than ${config.MAX_FILE_SIZE}`,
        400,
      ),
    );
  }

  front_image.name = `nid-front-${id}${path.parse(front_image.name).ext}`;
  back_image.name = `nid-back-${id}${path.parse(back_image.name).ext}`;

  //uploading NID
  front_image.mv(`${`${config.BASEURL}NID`}/${front_image.name}`, async err => {
    if (err) {
      console.log(err);
      return res.send({ result: 'Failed to upload NID' });
    }
  });

  back_image.mv(`${`${config.BASEURL}nid`}/${back_image.name}`, async err => {
    if (err) {
      console.log(err);
      return res.send({ result: 'Failed to upload NID' });
    }
  });

  await User.findByIdAndUpdate(id, { nid_image: [front_image, back_image] });
  return res.send({ result: 'NID Uploaded Successfully' });
});

exports.VerifyUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) return res.status(400).send({ result: 'Invalid link' });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });

    if (!token) return res.status(400).send({ result: 'Invalid link' });

    await User.updateOne({ _id: user._id, verified: true });
    await token.remove();

    res.status(200).send({ result: 'Email verified successfully' });
  } catch (error) {
    res.status(500).send({ result: 'Internal Server Error' });
  }
};

//   exports.logout = (req, res) => {
//     req.session.destroy((err) => {
//       // delete session data from store, using sessionID in cookie
//       if (err) throw err;
//       res.clearCookie("session-id"); // clears cookie containing expired sessionID
//       res.send("Logged out successfully");
//     });
//   }
