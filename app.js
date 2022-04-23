const express = require('express');
const cors = require('cors');
const colors = require('colors');
const InitDBConnection = require('./config/dbConnect');
const morgan = require('morgan');
const app = express();
const Router = require('./router/router');
const res = require('express/lib/response');

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(morgan('dev'));
app.use('/api', Router);

app.get('/version', (req, res) => res.send('1.1.9'));

const { PORT } = process.env;

InitDBConnection().then(() => {
  app.listen(PORT, () => {
      console.log(`Server listening on ${colors.cyan(`http://localhost:${PORT}`)}`);
  })
}).catch(err => {
  console.log(err);
})