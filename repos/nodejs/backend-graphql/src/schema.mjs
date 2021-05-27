import { buildSchema } from "graphql";

const types = `
    type Entity {
        id: ID!
        name: String
        fields: [Field]
    }
    type Field {
        id: ID!
        name: String
        entity: Entity!
    }
`;
const inputs = `
    input EntityInput {
        name: String!
    }
    input FieldInput {
        name: String!
        EntityId: ID!
    }
`;

const outputs = `
    type EntityOutput {
        node: Entity
    }
    type FieldOutput {
        node: Field
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
        createField(input: FieldInput): FieldOutput
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
