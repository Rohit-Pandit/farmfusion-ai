import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan'
import cookieParser from 'cookie-parser';

import routes from './routes/indexRoutes.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());


app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "FarmFusion API Running",
  });
});

export default app;