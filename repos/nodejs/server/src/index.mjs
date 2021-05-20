import express from "express";

import homepage from "./homepage.mjs";
import backend from "@agql.js/backend-graphql";

const app = express();
app.debug = true;

if (app.debug) {
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.url}`);
        next();
    });
}

backend(app);

app.use("/", (req, res) => res.send(homepage));

app.listen(4000);

console.log("Running on http://localhost:4000");
if (app.debug) {
    console.log("Routes registered");
    console.log(app._router.stack.map((route, i) => `${route.name}: ${route.regexp}`));
}
