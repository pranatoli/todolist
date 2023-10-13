require('dotenv').config()

let express = require('express');
let app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes/index');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptioins = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Customer API",
            description: "Customer Api Information",
            contact: {
                name: "Anatoli Prishchepov"
            },
            servers: [`http://localhost:${port}/`],
            version: "1.0.0"
        }
    },
    apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptioins);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => console.log('server started on port: ' + port));
console.log("Hello developer");

