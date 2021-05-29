import { useState } from "react";
import { useFragment, graphql } from "react-relay";
import {
    Dialog,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Button,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FieldForm from "./FieldForm";

const EntityDetails = (props) => {
    const { data } = props;

    const [addFieldFormOpen, setAddFieldFormOpen] = useState(false);

    const entity = useFragment(
        graphql`
            fragment EntityDetails_entity on Entity {
                id
                name
                fields {
                    id
                    name
                }
            }
        `,
        data
    );

    return (
        <Card>
            <CardHeader
                title={entity.name}
                subheader={entity.id}
                action={
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                }
            />
            <CardContent>
                <Dialog open={addFieldFormOpen} onClose={(ev) => setAddFieldFormOpen(false)}>
                    <FieldForm entity_id={entity.id} onCompleted={(field) => setAddFieldFormOpen(false)} />
                </Dialog>
                <List>
                    {(entity.fields || []).map((field, i) => (
                        <ListItem key={i} button>
                            <ListItemText primary={field.name} />
                        </ListItem>
                    ))}
                </List>
                <Button variant="contained" onClick={(ev) => setAddFieldFormOpen(true)}>
                    Add a Field
                </Button>
            </CardContent>
        </Card>
    );
};

export default EntityDetails;
