import { AgqlDataTypes, globalIdField } from "@agql.js/db";
import pluralize from "pluralize";

const interpolateDescription = (models) =>
    models.Entity.findAll({ include: [{ model: models.Field, as: "fields" }] }).then((entities) =>
        entities.map((entity, ei) => ({
            name: entity.name,
            fields: globalIdField().concat(
                (entity.fields || []).map((field, fi) => ({
                    name: field.name,
                    type: AgqlDataTypes.String,
                }))
            ),
            params: {
                query: pluralize.plural(entity.name).toLowerCase(),
                crud: true,
            },
        }))
    );

export default interpolateDescription;
