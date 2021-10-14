import Express from 'express';
const app = Express();
import Mysql from 'mysql';
import Cors from 'cors';

app.use(Cors());	// allows to make request from frontend to the backend
app.use(Express.json());

const db = Mysql.createConnection({
	user: 'root',
	host: 'localhost',
	password: 'prelude',
	database: 'mybalance'
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

	db.query(
	  'INSERT INTO users (name, email, password, mode, demoonly, confirmed) VALUES (?, ?, ?, ?, ?, ?)',
	  [name, email, password, mode, demoonly, confirmed],
	  (err, result) => {
	    if (err) {
	      res.send({status: "error", error: err.code});
	    } else {
			db.query(
			'SELECT id FROM users WHERE email="' + email + '" AND password="' + password + '"',
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
    )}
);

app.get('/userid', (req, res) => {
	db.query(
		'SELECT id, email, name FROM users WHERE email="' + req.query.email + '" AND password="' + req.query.password + '"',
		(err, result) => {
			if (err) {
			  console.log(err);
			} else {
			  res.send(result);
			}
		})
	console.log("getID-req: ", req.query);
})

app.listen(3001, () => {
    console.log("Server is running on port 3001!");
})