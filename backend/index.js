require('dotenv').config();
const path = require('path');
const express         = require('express');
const cors            = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser    = require('cookie-parser');
const router          = require('./router/index');
const errorMiddleware = require('./middlewares/error.middleware');
const db              = require('./db/index');

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

const PORT = process.env.PORT || 5000;
const app  = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(fileUpload({}))
app.use(express.static(path.join(__dirname, 'static')))
app.use('/api', router);
app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);
app.use(errorMiddleware);

const start = async () => {
    try {
        await db.connect(db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Successfully connect to MongoDB.');
        await db.initial(db.roleModel, db.roles);
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`) )
    }
    catch (error) {
        console.log(error);
        process.exit();
    }
}

start();