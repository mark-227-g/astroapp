const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const db = require('./models/models');
const sequelize = require('./models/database');
const routes = require('./controllers');
const path = require('path');
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync()
	.then(() => {
		app.listen(3000, () => console.log('Server listening on port 3000'));
	})
	.catch(error => console.error(error));
