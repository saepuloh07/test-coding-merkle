require('dotenv').config();

const express = require('express');
require('./db/conn')

const app = express();

app.use(express.json());

const routesGuest = require('./routes/guest')
app.use("/api/guest/", routesGuest)

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})