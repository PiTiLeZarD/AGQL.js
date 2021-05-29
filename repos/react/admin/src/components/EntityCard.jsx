import { useState } from "react";
import { useFragment, graphql } from "react-relay";
import {
    withStyles,
    Card,
    CardHeader,
    CardContent,
    List,
    ListItem,
    ListItemText,
    AppBar,
    Tabs,
    Tab,
    Dialog,
    Fab,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import styles from "../styles/EntityCard";
import FieldForm from "./FieldForm";

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
                }
            }
        `,
        data
    );

    const handleAddClick = (ev) => {
        if (currentTab === 0) {
            setFieldFormOpen(true);
        } else {
            alert("Not implemented yet!");
        }
    };

    return (
        <Card className={classes.card}>
            <CardHeader title={entity.name} subheader={`ID: ${entity.id}`} />
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
                    <List>
                        {(entity.fields || []).map((field, i) => (
                            <ListItem key={i} button>
                                <ListItemText primary={field.name} />
                            </ListItem>
                        ))}
                    </List>
                </TabPanel>

                <TabPanel value={currentTab} index={1}>
                    <p>Nothing here yet</p>
                </TabPanel>
            </CardContent>
        </Card>
    );
};

export default withStyles(styles)(EntityCard);
