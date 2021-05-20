import express from "express";

import homepage from "./homepage.mjs";

const app = express();

app.use("/", (req, res) => res.send(homepage));

app.listen(4000);
