import express from 'express';
import cors from 'cors';
import config from './config';
import { errorHandler } from './middleware';

const app = express();

app.use(cors());
app.use(express.json());



app.use(errorHandler);

app.listen(config.PORT, () => {
    console.log(`Server is up and running on PORT ${config.PORT}`);
});