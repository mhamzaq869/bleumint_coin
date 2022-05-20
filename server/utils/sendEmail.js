const nodemailer = require("nodemailer");
const config = require("../../config")

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			service: 'gmail',
			port: 587,
			secure: true,
			auth: {
				// user: config.USER,
				// pass: config.PASS,
				user: 'itsnihal.sharma@gmail.com',
				pass: 'qauaqhudtattdczj'
			},
		});

		await transporter.sendMail({
			from: 'itsnihal.sharma@gmail.com',
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};