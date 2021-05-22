import { List, ListItem, ListItemText, Card, CardContent, CardHeader, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";

const EntityList = (props) => {
    const { entities, setSelectedEntity } = props;

    return (
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
    );
};

export default EntityList;
