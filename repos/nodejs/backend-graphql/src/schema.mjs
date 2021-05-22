import { buildSchema } from "graphql";

const types = `
    type Entity {
        _id: Int
        name: String
    }
`;
const inputs = `
    input EntityInput {
        name: String!
    }
`;

const queries = `
    type Query {
        entities: [Entity]
    }
`;

const mutations = `
    type Mutation {
        createEntity(input: EntityInput): Entity
    }
`;

const schema = buildSchema(`
    ${types}
    ${queries}
    ${inputs}
    ${mutations}
`);

export default schema;
