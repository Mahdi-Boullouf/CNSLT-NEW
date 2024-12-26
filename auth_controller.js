const User = require('../models/user');
const bcrypt = require('bcryptjs');
const Area = require('../models/area')
const jwt = require('jsonwebtoken');
const {validationResult} = require("express-validator");
const respond = require('../helpers/response_helper');
const { default: mongoose } = require('mongoose');
const register = async (req, res) => {
  const { email, password ,fullname,phone} = req.body;
const result = validationResult(req);
if(!result.isEmpty()){
//error handling 
 res.send({errors:result.array()})
}else{
  const userExists = await User.findOne({ email });

  if (userExists) {
    respond({code:400,error:"User already exists",status:"error",res:res})
  return ;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

      // Generate verification token
      
      const verificationToken = crypto.randomUUID();

  const user = new User({ email, password: hashedPassword,fullname,phone,verificationToken:verificationToken});
  await user.save();

   await sendVerificationEmail(email, verificationToken);

  respond({code:201,message:"User registred succesfuly",status:"success",res:res})

}
 
    
  
};


const changePassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return respond({ code: 400, error: "User not found", status: "error", res: res });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return respond({ code: 400, error: "Incorrect current password", status: "error", res: res });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    respond({ code: 200, message: "Password changed successfully", status: "success", res: res });

  } catch (error) {
    console.log(error);
    return respond({ code: 500, status: "error", error: error, res: res });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
  
    const user = await User.findOne({ email });

    if (!user) {
      return respond({ code: 400, error: "Invalid credentials", status: "error", res: res });
    }

     if (!user.isVerified && user.type =='user') {
       return respond({ code: 403, error: "Email not verified. Please check your inbox.", status: "error", res: res });
     }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return respond({ code: 400, error: "Invalid credentials", status: "error", res: res });
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    
    const getUser = await User.findById(user._id, { email: 0, password: 0 });
    console.log(getUser)
    let areaId =null;
    if(getUser.type ==="admin"){
       areaId = await Area.find({ userId: getUser._id });
    }


    return respond({ code: 200, data: { token: token, user: getUser, areaId: getUser.type == 'receptor'? getUser.areaId: areaId ? areaId[0]._id : null }, status: "success", res: res });

  } catch (error) {
    console.log(error);
    return respond({ code: 500, status: "error", error: error.message, res: res });
  }
};

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
host: "localhost",
port:25,secure:false,
debug:true,
logger:true
  
});

const sendVerificationEmail = async (email, token) => {
  const verificationLink = `https://api.cnsl-tikjda.com/api/auth/verify-email?token=${token}`;

  const mailOptions = {
    from: 'CNSLT@cnsl-tikjda.com',
    to: email,
    subject: 'Please verify your email address',
    text: `Click the link to verify your email: ${verificationLink}`
  };

  return transporter.sendMail(mailOptions);
};
const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return respond({ code: 400, error: "Invalid or expired token", status: "error", res: res });
    }

    user.isVerified = true;
    user.verificationToken = undefined; // Remove the token after verification
    await user.save();
    emailVerified = "<center><div><h1>Email verified, you can log in now .</h1></div></center>"
   return res.send(emailVerified)
  } catch (error) {
    console.log(error);
    return respond({ code: 500, status: "error", error: error.message, res: res });
  }
};


const createReceptors = async (req,res) => {
  try {
    // Generate hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("secure_password_2024", salt);
const hashedPasswords = [
  await bcrypt.hash("20242024!", salt),
  await bcrypt.hash("20242024!!", salt),
  await bcrypt.hash("20242024!!!", salt),
  await bcrypt.hash("20262026!", salt), //fouka
  await bcrypt.hash("20262026!!", salt), //pinnoir
  await bcrypt.hash("20262026!!!", salt), //pinnoir
];

const areasIds = [
  "66b65caf05df9925c598396c", 
  "66b69dd146674f256fd80ce6",
  "66b69dee46674f256fd80cec",
  "676db551358b0c7c7b7166c0", // fouka
  "676db717358b0c7c7b7167c3", // pinnoir
  "676db798358b0c7c7b71681b", // seraidi
];
    // Define receptor accounts
    const receptors = [
      {
        fullname: "Receptor 1",
        email: "receptor-2025@cnsl-tikjda.com",
        password: hashedPasswords[0],
        phone: "1234567890",
        areaId:areasIds[0],
        type: "receptor",
        isVerified: true,
      },
      {
        fullname: "Receptor 2",
        email: "receptor-20252@cnsl-tikjda.com",
        password: hashedPasswords[1],
        phone: "1234567891",
        areaId:areasIds[1],

        type: "receptor",
        isVerified: true,
      },
      {
        fullname: "Receptor 3",
        email: "receptor-20253+3@cnsl-tikjda.com",
        password: hashedPasswords[2],
        phone: "1234567892",
        type: "receptor",
        areaId:areasIds[2],

        isVerified: true,
      },
      {
        fullname: "Receptor 3",
        email: "receptor-fouka@cnsl-tikjda.com",
        password: hashedPasswords[3],
        phone: "1234567892",
        type: "receptor",
        areaId:areasIds[3],

        isVerified: true,
      },
      {
        fullname: "Receptor 3",
        email: "receptor-pinnoir@cnsl-tikjda.com",
        password: hashedPasswords[4],
        phone: "1234567892",
        type: "receptor",
        areaId:areasIds[4],

        isVerified: true,
      },
      {
        fullname: "Receptor 3",
        email: "receptor-seraidi@cnsl-tikjda.com",
        password: hashedPasswords[5],
        phone: "1234567892",
        type: "receptor",
        areaId:areasIds[5],

        isVerified: true,
      },
    ];

    // Insert receptor accounts into the database
    await User.insertMany(receptors,{});

    console.log("Receptor accounts created successfully!");
    respond({code:200,data:"Success",status:"success",res:res});
  } catch (error) {
    console.error("Error creating receptors:", error);
    respond({code:500,data:"Error",status:"error",res:res});

  } finally {
  }
};



module.exports = { register, login , changePassword,sendVerificationEmail ,verifyEmail,createReceptors};
