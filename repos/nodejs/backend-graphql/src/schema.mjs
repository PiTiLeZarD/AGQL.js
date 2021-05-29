import { backendModelDescription } from "@agql.js/db";
import { interpolateSchema } from "@agql.js/schema";
import db from "./db.mjs";

const backendSchema = () => {
    const { models } = db();
    const { schema } = interpolateSchema(models, backendModelDescription);
    return schema;
};

export default backendSchema;
