import Express from 'express';
const app = Express();
import Mysql from 'mysql';
import Cors from 'cors';
import bcrypt from 'bcryptjs';

import "dotenv/config.js";

app.use(Cors());	// allows to make request from frontend to the backend
app.use(Express.json());

const db = Mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_DATA
});

app.get('/', (req,res) => {
	res.send("Connected");
})

app.post('/register', (req, res) => {
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;
	const mode = req.body.mode;
	const demoonly = req.body.demoonly;
	const confirmed = req.body.confirmed;

	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(password, salt, function(err, hash) {

			console.log("hash: ", hash);
			db.query(
				'INSERT INTO users (name, email, password, mode, demoonly, confirmed) VALUES (?, ?, ?, ?, ?, ?)',
				[name, email, hash, mode, demoonly, confirmed],
				(err, result) => {
				  	if (err) {
						res.send({status: "error", error: err.code});
				  	} else {
							db.query(
						    'SELECT id FROM users WHERE email="' + email + '" AND password="' + hash + '"',
						    (err, result) => {
							if (err) {
								console.log(err);
								res.send({status: "error", error: "NOT_FOUND"});
						  	} else {
								console.log("result", result[0]);
								res.send({status: "ok", id: result[0].id});
						  	}
					  		})
				  	}
				}
			)
		  			
		});
	})

});

app.get('/userid', (req, res) => { //treba sifrirati password
	db.query(
		'SELECT id, email, password, name FROM users WHERE email="' + req.query.email + '"',
		(err, result) => {
			if (err) {
			  console.log(err);
			  // res.send([{id: 0}]);
			} else {
				if (result.length>0) {
					console.log("result: ", result);
					console.log("result password: ", result[0].password);
					let ok = bcrypt.compareSync(req.query.password, result[0].password);
					if (ok) {
						result[0].password="";
						res.send(result);
					} else {
						res.send([{id: 0, error: "Wrong password!"}]);
					}
				} else {
					res.send([{id: 0, error: "SUch user doesn't exist."}]);
				}
			}
		})
})

app.listen(3001, () => {
    console.log("Server is running on port 3001!");
})