import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import routes from "./routes/route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.listen(process.env.PORT, () => {

  console.log(`Server Running on ${process.env.PORT}`);

});

export default app;
//http://localhost:5000/api