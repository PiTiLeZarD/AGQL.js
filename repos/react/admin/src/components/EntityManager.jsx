import { Fragment, useState } from "react";
import { graphql, useLazyLoadQuery } from "react-relay";
import { Grid, Dialog, Button } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import EntityCard from "./EntityCard";
import EntityForm from "./EntityForm";

const EntitiesQuery = graphql`
    query EntityManagerEntitiesQuery {
        entities {
            name
            ...EntityCard_entity
        }
    }
`;
const EntityManager = (props) => {
    const [entityFormOpen, setEntityFormOpen] = useState(false);
    const [searchText, setSearchText] = useState("");

    const { entities } = useLazyLoadQuery(EntitiesQuery);

    const filteredEntities = entities.filter((entity, ei) =>
        entity.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <Fragment>
            <Dialog open={entityFormOpen} onClose={(ev) => setEntityFormOpen(false)}>
                <EntityForm onCompleted={(entity) => setEntityFormOpen(false)} />
            </Dialog>
            <Grid container>
                <Grid item xs={3} />
                <Grid item xs={6}>
                    <Grid container spacing={1}>
                        <Grid item xs={9}>
                            <SearchBar
                                value={searchText}
                                onChange={(newValue) => setSearchText(newValue)}
                                onCancelSearch={() => setSearchText("")}
                            />
                        </Grid>
                        <Grid item xs={3} style={{ textAlign: "center", paddingTop: "11px" }}>
                            <Button variant="contained" onClick={(ev) => setEntityFormOpen(true)}>
                                Add Entity
                            </Button>
                        </Grid>
                    </Grid>
                    {filteredEntities.map((entity, i) => (
                        <EntityCard key={i} data={entity} />
                    ))}
                </Grid>
                <Grid item xs={3} />
            </Grid>
        </Fragment>
    );
};

export default EntityManager;
