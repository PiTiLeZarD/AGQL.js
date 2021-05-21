import { Fragment } from "react";
import { Grid, Paper } from "@material-ui/core";
import AgqlEffect from "./AgqlEffect";

const App = (props) => {
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
                    <Paper style={{ padding: "1.5em" }}>Here entities</Paper>
                </Grid>

                <Grid item xs={4}>
                    <Paper style={{ padding: "1.5em" }}>here details about entities</Paper>
                </Grid>
                <Grid item xs={2} />
            </Grid>
        </Fragment>
    );
};

export default App;
