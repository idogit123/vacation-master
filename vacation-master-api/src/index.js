import { getPet } from "./client.js";
import express from 'express';
const PORT = 8080;
const app = express();
app.get('/test', async (req, res) => {
    console.log(`request recived from ${req.headers.origin || "Unknown"}`);
    res.status(200).send(await getPet());
});
app.listen(PORT, () => { console.log(`listening on port: ${PORT}`); });
