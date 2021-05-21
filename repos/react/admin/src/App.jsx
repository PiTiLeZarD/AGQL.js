import { Fragment } from "react";
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
            <AgqlEffect foreground="Graphql Made Easy" background="AGQL" />
            <AgqlEffect foreground="Admin Panel Powered By" background="React" size={80} />
            <AgqlEffect foreground="Yeaaaaaah!" background="Hek" size={400} />
        </Fragment>
    );
};

export default App;
