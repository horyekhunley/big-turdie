const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user_model");

exports.register = async (data, role, res) => {
	try {
		const userTaken = await validateEmail(data.email);
		if (userTaken) {
			return res.status(400).json({
				email: "User with this email already exists",
				message: "Registration failed",
				success: false,
			});
		}
		const hashedPassword = await bcrypt.hash(data.password, 10);
		const newUser = new User({
			...data,
			password: hashedPassword,
			role,
		});
		await newUser.save();
		return res
			.status(201)
			.json({ message: "New user created successfully", success: true });
	} catch (err) {
		return res.status(500).json({ message: error.message, success: false });
	}
}
exports.login = async (data, res) => {
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

const validateEmail = async (email) => {
	let user = await User.findOne({ email });
	if (user) {
		return true;
	} else {
		return false;
	}
}
