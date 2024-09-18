const express = require("express");
const bodyparser = require("body-parser");
const nodemailer = require("nodemailer");

const server = express();
server.use(express.static("style"));
server.use(bodyparser.urlencoded({ extended: true }));

server.get("/", function (req, res) {
	res.sendFile(__dirname + "/index.html");
	console.log(__dirname);
});

server.post("/", function (req, res) {
	const comm = req.body.message;
	console.log(comm);
	const na = req.body.nameofperson;
	console.log(na);
	var transporter = nodemailer.createTransport({
		service: "yahoo",
		auth: {
			user: "aameensiddiqui@yahoo.com",
			pass: "agxrzqpqgyjvszlz", //app passwod of email goes here
		},
	});
	var emailOptions = {
		from: "aameensiddiqui@yahoo.com",
		to: req.body.username,
		cc: "aameensiddiqui@yahoo.com",
		subject: "Thank you for your contacting me " + na + "!",
		text: comm,
	};
	transporter.sendMail(emailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			res.redirect("/");
			console.log("email sent" + info.response);
		}
	});
});

server.listen(3000, function () {
	console.log("server started at port 3000!");
});
