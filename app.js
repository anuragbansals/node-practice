const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet')
const express = require('express')
const Joi = require('joi');
const app = express();
const logger = require('./logger');
const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db')
const courses = require('./routes/courses')
// const cors = require('cors')

// Configuration

// console.log('Application Name: '+ config.get('name'));
// console.log('Mail Server: '+ config.get('mail.host'));


// undefined
// console.log(`node env: ${process.env.NODE_ENV}`)
// console.log(`app. ${app.get('env')}`)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses)

if(app.get('env')==='development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...')
    console.log('Morgan enabled')
}

//Db work..

dbDebugger('Connected to the database..')


app.use(logger)

app.use(function (req, res, next) {
    console.log('Authenticating...');
    next();
})


app.listen(3000, () => console.log('listening on port 3000'));
