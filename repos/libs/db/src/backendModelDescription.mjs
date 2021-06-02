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
            {
                type: "hasMany",
                with: "Link",
                alias: "links",
                expose: true,
                foreignKey: "entity_from_id",
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
    {
        name: "Link",
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
                alias: "entity_from",
                foreignKey: "entity_from_id",
            },
            {
                type: "belongsTo",
                with: "Entity",
                alias: "entity_to",
                foreignKey: "entity_to_id",
                expose: true,
            },
            {
                type: "belongsTo",
                with: "Field",
                alias: "field",
                foreignKey: "field_id",
                expose: true,
            },
        ],
        params: {
            crud: true,
        },
    },
];

export default dbDescription;
