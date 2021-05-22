import { Fragment, useState } from "react";
import { Grid, List, ListItem, ListItemText, Card, CardContent, CardHeader, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AgqlEffect from "./AgqlEffect";

const App = (props) => {
    const [selectedEntity, setSelectedEntity] = useState(null);

    return (
        <Fragment>
            <style type="text/css">{`
                * {
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                }
                
                body {
                    padding: 0;
                    margin: 0;
                    background: #030005;
                }
            `}</style>
            <div style={{ margin: "3em auto" }}>
                <AgqlEffect foreground="Graphql Made Easy" background="AGQL" size={80} />
            </div>
            <Grid container spacing={8}>
                <Grid item xs={2} />
                <Grid item xs={4}>
                    <Card>
                        <CardHeader
                            title="Entities"
                            subheader="10 Entities currently in the database"
                            action={
                                <IconButton>
                                    <AddIcon />
                                </IconButton>
                            }
                        />
                        <CardContent>
                            <List>
                                {new Array(10).fill().map((_, i) => (
                                    <ListItem button onClick={(ev) => setSelectedEntity(i)}>
                                        <ListItemText primary={`Entity ${i}`} />
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
                                title={`Entity ${selectedEntity}`}
                                subheader={`ID: ${selectedEntity} Created At: September 14, 2016`}
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
        </Fragment>
    );
};

export default App;
