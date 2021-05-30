import { useState, Fragment } from "react";
import { useFragment, graphql } from "react-relay";
import {
    withStyles,
    Card,
    CardHeader,
    CardContent,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    AppBar,
    Tabs,
    Tab,
    Dialog,
    Fab,
    IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "../styles/EntityCard";
import FieldForm from "./FieldForm";
import MutationButton from "./MutationButton";

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <div>{children}</div>}
        </div>
    );
};

const EntityCard = (props) => {
    const { classes, data } = props;

    if (!data) return null;

    const [currentTab, setCurrentTab] = useState(0);
    const [fieldFormOpen, setFieldFormOpen] = useState(false);

    const entity = useFragment(
        graphql`
            fragment EntityCard_entity on Entity {
                id
                name
                fields {
                    id
                    name
                    type
                }
            }
        `,
        data
    );
    const hasFields = (entity.fields || []).length > 0;

    const handleAddClick = (ev) => {
        if (currentTab === 0) {
            if (!hasFields) {
                alert("Add an ID first!");
            } else {
                setFieldFormOpen(true);
            }
        } else {
            alert("Not implemented yet!");
        }
    };

    return (
        <Card className={classes.card}>
            <CardHeader
                title={entity.name}
                subheader={`ID: ${entity.id}`}
                action={
                    <Fragment>
                        <IconButton>
                            <EditIcon />
                        </IconButton>
                        <MutationButton
                            Component={IconButton}
                            color="default"
                            label={<DeleteIcon />}
                            mutation={graphql`
                                mutation EntityCardDeleteEntityMutation($input: EntityInput!) {
                                    deleteEntity(input: $input) {
                                        node {
                                            id
                                        }
                                    }
                                }
                            `}
                            linkRecordsParams={({ deleteEntity }) => [deleteEntity.node.id, "entities"]}
                            variables={{ input: { id: entity.id } }}
                        />
                    </Fragment>
                }
            />
            <CardContent>
                <Dialog open={fieldFormOpen} onClose={(ev) => setFieldFormOpen(false)}>
                    <FieldForm entity_id={entity.id} onCompleted={(field) => setFieldFormOpen(false)} />
                </Dialog>
                <Fab className={classes.fab} color="secondary" onClick={handleAddClick}>
                    <AddIcon />
                </Fab>
                <AppBar position="static">
                    <Tabs value={currentTab} onChange={(ev, newValue) => setCurrentTab(newValue)}>
                        <Tab label="Fields" />
                        <Tab label="Links" />
                    </Tabs>
                </AppBar>
                <TabPanel value={currentTab} index={0}>
                    {hasFields && (
                        <List>
                            {entity.fields.map((field, i) => (
                                <ListItem key={i} button>
                                    <ListItemText primary={`${field.name}: ${field.type}`} />
                                    {field.type != "globalId" && (
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end">
                                                <EditIcon />
                                            </IconButton>
                                            <MutationButton
                                                Component={IconButton}
                                                color="default"
                                                label={<DeleteIcon />}
                                                mutation={graphql`
                                                    mutation EntityCardDeleteFieldMutation($input: FieldInput!) {
                                                        deleteField(input: $input) {
                                                            node {
                                                                id
                                                            }
                                                        }
                                                    }
                                                `}
                                                linkRecordsParams={({ deleteField }) => [
                                                    deleteField.node.id,
                                                    `entities[${entity.id}].fields`,
                                                ]}
                                                variables={{ input: { id: field.id } }}
                                            />
                                        </ListItemSecondaryAction>
                                    )}
                                </ListItem>
                            ))}
                        </List>
                    )}
                    {!hasFields && (
                        <div className={classes.idContainer}>
                            <MutationButton
                                label="Add an ID to this entity"
                                color="secondary"
                                mutation={graphql`
                                    mutation EntityCardAddIdMutation($input: FieldInput!) {
                                        createField(input: $input) {
                                            node {
                                                id
                                                name
                                                type
                                            }
                                        }
                                    }
                                `}
                                linkRecordsParams={({ createField }) => [
                                    createField.node.id,
                                    `entities[${entity.id}].fields`,
                                ]}
                                variables={{
                                    input: {
                                        name: "id",
                                        type: "globalId",
                                        entity_id: entity.id,
                                    },
                                }}
                            />
                        </div>
                    )}
                </TabPanel>

                <TabPanel value={currentTab} index={1}>
                    <p>Nothing here yet</p>
                </TabPanel>
            </CardContent>
        </Card>
    );
};

export default withStyles(styles)(EntityCard);
