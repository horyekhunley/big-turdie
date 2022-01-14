const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user_model");

//create a new user
const register = async (data, role, res) => {
  //check to see if user already exists in the database
	try {
		const userTaken = await validateEmail(data.email);
		if (userTaken) {
			return res.status(400).json({
				email: "User with this email already exists",
				message: "Registration failed",
				success: false,
			});
		}
    //hash password
		const hashedPassword = await bcrypt.hash(data.password, 10);
		const newUser = new User({
			...data,
			password: hashedPassword,
		});
		await newUser.save()
		return res
			.status(201)
			.json({ message: "New user created successfully", success: true });
	} catch (err) {
		return res.status(500).json({ message: error.message, success: false });
	}
}
//login user to app
const login = async (data, res) => {
  // when user inputes email and password, we check to see if user already exists in the database using the email field
	try {
		let { email, password } = data;
		const user = await User.findOne({ email });
		if (!user) {
			res.status(404).json({
				message: "Failed login attempt",
				email: "Incorrect email",
				success: false,
			});
		}
    //we also check if the password the user supplies is the same as the one in db
		let isMatch = await bcrypt.compare(password, user.password);
		if (isMatch) {
			let token = jwt.sign(
				{
					user_id: user._id,
					email: user.email,
					name: user.name,
				},
				process.env.JWT_SECRET,
				{
					expiresIn: "7 days",
				}
			);
			let profile = {
				email: user.email,
				name: user.name,
			};
			let result = {
				user: profile,
				token: token,
				expiresIn: 168,
			};
			return res.status(200).json({
				...result,
				message: "Login success",
				success: true,
			});
		} else {
			return res.status(403).json({
				message: "Failed login attempt",
				email: "Incorrect password",
				success: false,
			});
		}
	} catch (err) {
		return res.status(500).json({
			message: err.message,
			success: false,
		});
	}
}
const logout = async(req, res) => {
  res.clearCookie('token')
  return res.status(200).json({
    message: 'User logged out'
  })
}
//to see if the email exists in db
const validateEmail = async (email) => {
	let user = await User.findOne({ email });
	if (user) {
		return true;
	} else {
		return false;
	}
}

module.exports = {
	login,
	register
};