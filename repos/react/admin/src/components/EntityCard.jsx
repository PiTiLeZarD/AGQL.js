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
import UnfoldLessIcon from "@material-ui/icons/UnfoldLess";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";

import MutationButton from "./MutationButton";
import { EntityCard as styles } from "../styles";
import { FieldForm } from "../forms";

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
    const [fieldFormOpen, setFieldFormOpen] = useState(null);
    const [folded, setFolded] = useState(true);

    const handleOpenFieldDialog = (field) => (ev) => setFieldFormOpen(field);
    const handleCloseFieldDialog = (ev) => setFieldFormOpen(null);

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
                handleOpenFieldDialog(true)(ev);
            }
        } else {
            alert("Not implemented yet!");
        }
    };

    return (
        <Card className={classes.card}>
            <CardHeader
                title={entity.name}
                subheader={folded ? null : `ID: ${entity.id}`}
                action={
                    <Fragment>
                        {!folded && (
                            <Fragment>
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                                <MutationButton
                                    Component={IconButton}
                                    color="default"
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
                                >
                                    <DeleteIcon />
                                </MutationButton>
                                <IconButton onClick={(ev) => setFolded(true)}>
                                    <UnfoldLessIcon />
                                </IconButton>
                            </Fragment>
                        )}
                        {folded && (
                            <IconButton onClick={(ev) => setFolded(false)}>
                                <UnfoldMoreIcon />
                            </IconButton>
                        )}
                    </Fragment>
                }
            />
            {!folded && (
                <CardContent>
                    <Dialog open={fieldFormOpen != null} onClose={handleCloseFieldDialog}>
                        <FieldForm
                            entity_id={entity.id}
                            field={fieldFormOpen !== true ? fieldFormOpen : null}
                            onCompleted={handleCloseFieldDialog}
                        />
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
                                                <IconButton edge="end" onClick={handleOpenFieldDialog(field)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <MutationButton
                                                    Component={IconButton}
                                                    color="default"
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
                                                >
                                                    <DeleteIcon />
                                                </MutationButton>
                                            </ListItemSecondaryAction>
                                        )}
                                    </ListItem>
                                ))}
                            </List>
                        )}
                        {!hasFields && (
                            <div className={classes.idContainer}>
                                <MutationButton
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
                                >
                                    Add an ID to this entity
                                </MutationButton>
                            </div>
                        )}
                    </TabPanel>

                    <TabPanel value={currentTab} index={1}>
                        <p>Nothing here yet</p>
                    </TabPanel>
                </CardContent>
            )}
        </Card>
    );
};

export default withStyles(styles)(EntityCard);
