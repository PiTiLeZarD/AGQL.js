import { useState } from "react";
import { graphql, useLazyLoadQuery } from "react-relay";
import { Grid, List, ListItem, ListItemText, Card, CardContent, CardHeader, IconButton } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const EntitiesQuery = graphql`
    query EntityManagerEntitiesQuery {
        entities {
            _id
            name
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
                <Card>
                    <CardHeader
                        title="Entities"
                        subheader={`${entities.length} Entities currently in the database`}
                        action={
                            <IconButton>
                                <AddIcon />
                            </IconButton>
                        }
                    />
                    <CardContent>
                        <List>
                            {entities.map((entity, i) => (
                                <ListItem key={i} button onClick={(ev) => setSelectedEntity(entity)}>
                                    <ListItemText primary={entity.name} />
                                    <DoubleArrowIcon />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={4}>
                {selectedEntity != null && (
                    <Card>
                        <CardHeader
                            title={`${selectedEntity._id}: ${selectedEntity.name}`}
                            subheader={`Other informations`}
                            action={
                                <IconButton>
                                    <MoreVertIcon />
                                </IconButton>
                            }
                        />
                        <CardContent>Here fields and links</CardContent>
                    </Card>
                )}
            </Grid>
            <Grid item xs={2} />
        </Grid>
    );
};

export default EntityManager;
