import express from "express";

import homepage from "./homepage.mjs";
import backend from "@agql.js/backend-graphql";

const app = express();
app.debug = process.env.DEBUG == 1;

if (app.debug) {
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.url}`);
        next();
    });
}

const mode = process.env.SERVER_MODE;
if (mode == "backend" || mode == "all") {
    backend(app);
}

app.use("/", (req, res) => res.send(homepage));

const port = process.env.SERVER_PORT || 4000;
app.listen(port);
console.log(`Running on http://localhost:${port}`);

if (app.debug) {
    console.log("Routes registered");
    console.log(app._router.stack.map((route, i) => `${route.name}: ${route.regexp}`));
}
