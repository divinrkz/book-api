require('dotenv').config();

require('./src/models/db/db');

const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');


const PORT = process.env.SERVER_PORT;



app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cors());

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));