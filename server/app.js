import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

// setup express app
const app = express();

// log requests to the console
app.use(logger('dev'));

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome To Event manager API!!!',
  }));
  
  export default app;
