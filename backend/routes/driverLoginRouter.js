const router = require("express").Router();
const { Driver } = require("../models/driver_profilemodel");
const bcrypt = require("bcrypt");
const Joi = require("joi");

//http://localhost:8070/api/ldriver/driverlogin
router.post("/driverlogin", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await Driver.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const token = user;
		res.status(200).send({ data: token, message: "login is successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
	
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;