import { buildSchema } from "graphql";

const types = `
    type Entity {
        id: String
        name: String
    }
`;
const inputs = `
    input EntityInput {
        name: String!
    }
`;

const outputs = `
    type EntityOutput {
        node: Entity
    }
`;

const queries = `
    type Query {
        entities: [Entity]
    }
`;

const mutations = `
    type Mutation {
        createEntity(input: EntityInput): EntityOutput
    }
`;

const schema = () =>
    buildSchema(`
        ${types}
        ${queries}
        ${inputs}
        ${outputs}
        ${mutations}
    `);

export default schema;
