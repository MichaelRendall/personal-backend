import express from "express";
import paperGameRoutes from "./routes/paper-game";

const app = express();

app.use(paperGameRoutes);

app.listen(3000);
