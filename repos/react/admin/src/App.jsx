import { Suspense } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import RelayEnvironment from "./relay";

import { AgqlEffect } from "./components";
import { Home } from "./pages";

const App = (props) => {
    return (
        <RelayEnvironmentProvider environment={RelayEnvironment}>
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
            <Suspense fallback={"Loading ..."}>
                <div style={{ margin: "3em auto" }}>
                    <AgqlEffect foreground="Graphql Made Easy" background="AGQL" size={80} />
                    <Home />
                </div>
            </Suspense>
        </RelayEnvironmentProvider>
    );
};

export default App;
