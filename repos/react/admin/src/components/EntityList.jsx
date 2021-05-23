import { Fragment, useState } from "react";
import { Dialog, List, ListItem, ListItemText, Card, CardContent, CardHeader, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import EntityForm from "./EntityForm";

const EntityList = (props) => {
    const { entities, setSelectedEntity } = props;

    const [addEntityFormOpen, setAddEntityFormOpen] = useState(false);

    return (
        <Fragment>
            <Dialog open={addEntityFormOpen} onClose={(ev) => setAddEntityFormOpen(false)}>
                <EntityForm />
            </Dialog>
            <Card>
                <CardHeader
                    title="Entities"
                    subheader={`${entities.length} Entities currently in the database`}
                    action={
                        <IconButton onClick={(ev) => setAddEntityFormOpen(true)}>
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
        </Fragment>
    );
};

export default EntityList;
