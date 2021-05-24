import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const rootValue = {
    hello: () => "world !",
};

export { schema, rootValue };
