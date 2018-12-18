const fs 		= require('fs');

const jwt 		= require('jsonwebtoken');

// http://travistidwell.com/blog/2013/09/06/an-online-rsa-public-and-private-key-generator/

// use 'utf8' to get string instead of byte array  (1024 bit key)

var privateKEY 	= fs.readFileSync('./private.key', 'utf8'); // to sign JWT

var publicKEY 	= fs.readFileSync('./public.key', 'utf8'); 	// to verify JWT

var issuer = "moki";

module.exports = {

	sign: (payload) => {
			console.log("sign");
		/*

			sOptions = {

				issuer: "Authorizaxtion/Resource/This server",

				subject: "iam@user.me", 

				audience: "Client_Identity" // this should be provided by client

			}

		*/



		// Token signing options

		var signOptions = {

			issuer: 	issuer,

			// subject: 	$Options.subject,

			// audience: 	$Options.audience,

			expiresIn: 	"30d",				// 30 days validity

			algorithm: 	"RS256" 			// RSASSA options[ "RS256", "RS384", "RS512" ]

		};

		return jwt.sign(payload, privateKEY, signOptions);

	},



	verify: (token) => {

		/*

			vOption = {

				issuer: "Authorization/Resource/This server",

				subject: "iam@user.me", 

				audience: "Client_Identity" // this should be provided by client

			}		

		*/

		var verifyOptions = {

			issuer: 	issuer,

			// subject: 	$Option.subject,

			// audience: 	$Option.audience,

			expiresIn: 	"30d",

			algorithm: 	["RS256"]

		};

		try {

			return jwt.verify(token, publicKEY, verifyOptions);

		}catch(err){

			return false;

		}

	}, 



	decode: (token) => {

		return jwt.decode(token, {complete: true});

	}

}


// var t = require('./jwt-module.js');
// console.log("test");
// var token = t.sign({username: "abc", password: "123", id: "123456"});
// console.log("token: " + token);
// // console.log(t.decode(token));
// console.log(t.verify(token));
// console.log(Math.floor(Date.now() / 1000));