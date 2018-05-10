import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import event from './routes/event';
import center from './routes/center';
import user from './routes/user';


// setup/initialize express app
const app = express();

// log requests to the console
app.use(logger('dev'));

// Parse incoming request bodies in a middleware before your handlers,
// available under the req.body property.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/users', user);
app.use('/api/v1/events', event);
app.use('/api/v1/centers', center);


// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/api/v1/home', (req, res) => res.status(200).send({
  message: 'Welcome To Muche Event manager API!!!',
}));

export default app;
