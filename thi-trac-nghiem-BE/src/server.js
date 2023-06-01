import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './routes/web'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import sequelize from './configs/connection_database';
import ResultQuestionModel from './models/EnterContestDetail.models'
const app = express();

require('dotenv').config();
app.use(cookieParser());
const port = process.env.PORT;

// middleware to read req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: true }))

configViewEngine(app);
initWebRoute(app);

try {
    sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        });
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


ResultQuestionModel
    .sync()


app.listen(port, () => {
    console.log(`HERE WE GO listening on port ${port}`)
})