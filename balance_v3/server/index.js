import Express, {json} from 'express';
const app = Express();
import Mysql from 'mysql';
import Cors from 'cors';

app.use(Cors());	// allows to make request from frontend to the backend
app.use(json());

const db = Mysql.createConnection({
	user: 'root',
	host: 'localhost',
	password: 'prelude',
	database: 'mybalance'
});

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
	      console.log(err);
	    } else {
	      res.send('Values Inserted');
	    }
	  }
    )}
);

app.get('/userID', (req, res) => {
	console.log("getID", req.body);
})


app.listen(3001, () => {
    console.log("Server is running on port 3001!");
})