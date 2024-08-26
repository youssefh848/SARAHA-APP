import { customAlphabet } from "nanoid";
import { User } from "../../../DB/models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmails } from "../../middelware/sendEmails.js";
import { AppError } from "../../utils/appError.js";


const generateOTP = customAlphabet("0123456789", 5)

//registration
const registration = async (req, res, next) => {
    //get data
    const { username, email, password } = req.body;
    //hashpassword
    const hashpassword = bcrypt.hashSync(password, 10)
    //generate OTP
    const otp = generateOTP()
    const resendOTP_Token = jwt.sign({ email }, 'youssef')
    await sendEmails({
        to: req.body.email,
        subject: "Confirm your email",
        html: ` <h1>Your OTP is ${otp} </h1>
        <h3> incase the OTP expired please click this <a href="http://localhost:3000/auth/resendOTP/${resendOTP_Token}"> link </a></h3>

        `,
    });

    // expire otp
    const otpExpired = Date.now() + 3 * 60 * 1000;
    //save user in db
    const user = await User.create({
        username,
        email,
        password: hashpassword,
        otp,
        otpExpired
    });
    // const user = await User.insertMany(req.body)

    // Remove password from the response
    const userResponse = { ...user._doc };
    delete userResponse.password;

    // Send response
    res.status(201).json({ message: "User created successfully", user: userResponse });
}

//login
const login = async (req, res, next) => {
    //get data
    const { email, password } = req.body;
    //check if user exist
    const userExist = await User.findOne({ email })
    if (!userExist) {
        //return res.status(400).json({ message: "User does not exist" });
        return next(new AppError("User does not exist", 400))
    }
    //check if password is correct
    const isMatch = await bcrypt.compareSync(password, userExist.password)
    if (!isMatch) {
        //return res.status(400).json({ message: "Password is incorrect" });
        return next(new AppError("Password is incorrect", 400))

    }
    if (!userExist.confirmEmail) {
        //return res.status(404).json({ message: "Please confirm email" });
        return next(new AppError("Please confirm email", 404))
    }
    //generate token
    jwt.sign({ id: userExist._id, username: userExist.username, role: userExist.role },
        'youssef', { expiresIn: '1h' },
        (err, token) => {
            res.status(200).json({ message: "User logged in successfully", token });
        })
}

// confirm Email
const confirmEmail = async (req, res, next) => {
    //get data
    const { email, otp } = req.body;
    //check if user exist
    const userExist = await User.findOne({ email })
    if (!userExist) {
        //return res.status(404).json({ message: "User does not exist" });
        return next(new AppError("User does not exist", 404))
    }
    if (userExist.confirmEmail) {
        // return res.status(400).json({ message: "email already confirmed" });
        return next(new AppError("email already confirmed", 400))
    }
    //check if otp is valid
    if (userExist.otp !== otp) {
        // return res.status(404).json({ message: "Invalid OTP" });
        return next(new AppError("Invalid OTP", 404))

    }

    const currentDate = new Date();
    const expireDate = new Date(userExist.otpExpired);
    if (currentDate > expireDate) {
        // return res.status(404).json({ message: "OTP expired" });
        return next(new AppError("OTP expired", 404))
    }
    userExist.confirmEmail = true;
    await userExist.save()
    res.status(200).json({ message: "Email confirmed successfully" });
}

// resend otp
const resendOtp = async (req, res, next) => {
    //get data
    const { token } = req.params;
    const { email } = jwt.verify(token, 'youssef')

    //const { email, otp } = req.body;
    //check if user exist
    const userExist = await User.findOne({ email })
    if (!userExist) {
        //return res.status(404).json({ message: "User does not exist" });
        return next(new AppError("User does not exist", 404))
    }
    if (userExist.confirmEmail) {
        // return res.status(400).json({ message: "email already confirmed" });
        return next(new AppError("email already confirmed", 400))
    }

    const currentDate = new Date()
    if (userExist.otpExpired > currentDate) {
        // return res.status(404).json({ message: `OTP still valid, wait ${((userExist.otpExpired - currentDate) / (1000 * 60)).toFixed(2)} minutes` });
        return next(new AppError(`OTP still valid, wait ${((userExist.otpExpired -
            currentDate) / (1000 * 60)).toFixed(2)} minutes`, 404))
    }

    const otp = generateOTP();

    await sendEmails({
        to: email,
        subject: "Resend OTP",
        html: ` <h1>Your OTP is ${otp} </h1> `,
    });

    const otpExpired = Date.now() + 3 * 60 * 1000;

    userExist.otp = otp;
    userExist.otpExpired = otpExpired
    await userExist.save();
    res.status(200).json({ message: "OTP resent successfully" });
}



export {
    registration,
    login,
    confirmEmail,
    resendOtp
}