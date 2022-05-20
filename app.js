require('dotenv').config();

require('./src/models/db/db');

const express = require('express');
const app = express();
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyparser = require('body-parser');
const {UserRoute} = require('./src/routes/user.route');

const PORT = process.env.SERVER_PORT;

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cors());

const swaggerOptions = {
    swaggerDefinition: {
        // openapi: '3.0.1',
        info: {
            title: 'Book API',
            version: '1.0.0',
            description: 'BOOK API Documentation',
        },
        schemes: 'http',
        host: 'localhost:' + PORT,
        basePath: '/',
        securityDefinitions: {
            bearerAuth: {
                type: 'apiKey',
                name: 'Authorization',
                scheme: 'bearer',
                in: 'header',
            },
        },
    },
    apis: ['./src/routes/**/*.js', './src/routes/**/**/*.js',
        './src/models/**/*.js',  './src/models/**/**/*.js', './src/models/**/**/**/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocs);
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, false, { docExpansion: "none" }));


app.use('/api/users',  UserRoute);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));