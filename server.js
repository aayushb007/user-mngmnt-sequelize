require('dotenv').config()

const express = require('express');
const app = express();
const sequelize = require('./config/db');
const userRoutes = require('./routes/user');
const cors = require('cors');
const featuresRoutes = require('./routes/feature');
const addressRoutes = require('./routes/address');
const taskRoutes = require('./routes/task');
var l10n = require('jm-ez-l10n');
const bodyParser = require('body-parser');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
l10n.setTranslationsFile("en", "./language/translate.en.json");
app.use(l10n.enableL10NExpress);
app.use('/users', userRoutes);
app.use('/address', addressRoutes);
app.use('/features', featuresRoutes);
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Ums API' });
});

sequelize.sync().then(() => {
    console.log('Database synchronized');
    app.listen(3005, () => {
        console.log('Server is running on port 3005');
        logger.info('This is a test server');
      });
}).catch(err => {
    console.error('Unable to synchronize the database:', err);
    logger.error('Error message');
    
});