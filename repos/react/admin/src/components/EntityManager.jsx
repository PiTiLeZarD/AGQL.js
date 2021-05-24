import { useState } from "react";
import { graphql, useLazyLoadQuery } from "react-relay";
import { Grid } from "@material-ui/core";

import EntityList from "./EntityList";
import EntityDetails from "./EntityDetails";

const EntitiesQuery = graphql`
    query EntityManagerEntitiesQuery {
        entities {
            id
            name
            ...EntityDetails_entity
        }
    }
`;
const EntityManager = (props) => {
    const [selectedEntity, setSelectedEntity] = useState(null);

    const { entities } = useLazyLoadQuery(EntitiesQuery);

    return (
        <Grid container spacing={8}>
            <Grid item xs={2} />
            <Grid item xs={4}>
                <EntityList entities={entities} setSelectedEntity={setSelectedEntity} />
            </Grid>

            <Grid item xs={4}>
                {selectedEntity != null && <EntityDetails data={selectedEntity} />}
            </Grid>
            <Grid item xs={2} />
        </Grid>
    );
};

export default EntityManager;
