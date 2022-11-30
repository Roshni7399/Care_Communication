import express from 'express';
import cors from 'cors';
import { mongoconnection } from './db';
import bodyParser from 'body-parser';
import User from './routes/User'
import Nurse from './routes/Nurse'
import Assist from './routes/Assist'
import Physician from './routes/Physician'
import NursingHome from './routes/NursingHome'

const app = express();
mongoconnection();

app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());

app.use(bodyParser.json({ limit: "50mb" }));

app.use("/user", User);
app.use("/nurse",Nurse);
app.use("/assist",Assist);
app.use("/physician",Physician);
app.use("/nursinghome",NursingHome)
app.use("/uploads",express.static("uploads"));


export default app;