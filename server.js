const path = require('path');
const express = require('express');
const session = require('express-session'); // stores everyting in memory
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
// Create a new sequelize store using the express-session package.
const SequelizeStore = require('connect-session-sequelize')(session.Store); // stores it in the database
//'connect-session-sequelize' connects our session store.

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

// configure and link a session object with the sequelizeStore information we created earlier
const sess = {
  secret: 'Super secret secret',
  cookie: {
    // Timeout set for 15 minute
    maxAge: 1000 * 60 * 15,
    // Session expires after 1 min of inactivity
    expires: 1000 * 60 * 5,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// Add express-session and store as Express.js middleware
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);



sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
