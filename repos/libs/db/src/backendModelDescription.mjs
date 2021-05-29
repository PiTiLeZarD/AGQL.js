import AgqlDataTypes from "./AgqlDataTypes.mjs";
import globalIdField from "./globalIdField.mjs";

const dbDescription = [
    {
        name: "Entity",
        fields: globalIdField().concat([
            {
                name: "name",
                type: AgqlDataTypes.String,
                params: {
                    required: true,
                },
            },
        ]),
        links: [
            {
                type: "hasMany",
                with: "Field",
                alias: "fields",
                expose: true,
                foreignKey: "entity_id",
            },
        ],
        params: {
            query: "entities",
            crud: true,
        },
    },
    {
        name: "Field",
        fields: globalIdField().concat([
            {
                name: "name",
                type: AgqlDataTypes.String,
            },
            {
                name: "type",
                type: AgqlDataTypes.String,
            },
        ]),
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
