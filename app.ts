import express from "express";
import routes from "./routes";
import cors from "cors";

const app = express();
const port = 3000;

app.use(
    cors({
        origin: "*", // Disable CORS for local development
        optionsSuccessStatus: 200,
    })
);

app.use(express.json());
app.use("/api", routes);

app.listen(port, () => {
    console.log(`LocalSearch backend service is running at post ${port}`);
});
