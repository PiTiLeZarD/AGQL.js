import { AgqlDataTypes } from "./AgqlDataTypes";

const dbDescription = [
    {
        name: "Entity",
        fields: [
            {
                name: "id",
                type: AgqlDataTypes.globalId,
            },
            {
                name: "name",
                type: AgqlDataTypes.String,
                params: {
                    required: true,
                },
            },
        ],
        links: [
            {
                type: "hasMany",
                with: "Field",
                alias: "fields",
                expose: true,
                foreign_key: "entity_id",
            },
        ],
        params: {
            query: "entities",
            crud: true,
        },
    },
    {
        name: "Field",
        fields: [
            {
                name: "id",
                type: AgqlDataTypes.globalId,
            },
            {
                name: "name",
                type: AgqlDataTypes.String,
            },
        ],
        links: [
            {
                type: "belongsTo",
                with: "Entity",
                alias: "entity",
            },
        ],
        params: {
            crud: true,
        },
    },
];

export default dbDescription;
