'use stricts';

const express = require('express');
const mongojs = require('mongojs');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

let app = express();
let db = mongojs("docuplace");

app.engine('handlebars', exphbs({defaultLayout: 'default'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let port = process.env.PORT || 1234;

app.use(express.static("public"));

app.use((req,res,next) => {
	console.log("request: ", req.method, req.get('host') + req.originalUrl );
	next();
});

const forms = require('./controllers/forms')(db);
app.use('/forms', forms);

app.listen(port,() => console.log('server start on port ' + port ));
