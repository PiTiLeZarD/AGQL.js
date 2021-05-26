import { useState } from "react";
import { Button, CircularProgress, Chip } from "@material-ui/core";
import WarningIcon from "@material-ui/icons/Warning";

import { useMutation, useRelayEnvironment, commitLocalUpdate } from "react-relay";

/**
 * `MutationButton` is an all managed button committing a graphql mutation using react-relay and manages inflight/errors
 */
const MutationButton = (props) => {
    const { mutation, label, variables, linkRecordsParams, onCompleted, onError, onClick, ...otherProps } = props;

    const [commit, isInFlight] = useMutation(mutation);
    const [error, setError] = useState(false);

    const environment = useRelayEnvironment();
    const linkRecords = (data) => {
        const [nodeId, parent] = linkRecordsParams(data);

        commitLocalUpdate(environment, (store) => {
            if (parent == null) {
                store.delete(nodeId);
                if (onCompleted) return onCompleted(data);
            }
            const record = store.get(nodeId);
            const parentNode = parent
                .split(".")
                .slice(0, -1)
                .reduce((acc, elmt) => acc.getLinkedRecord(elmt), store.getRoot());
            const collectionName = parent.split(".").splice(-1);
            const collection = parentNode.getLinkedRecords(collectionName) || [];

            parentNode.setLinkedRecords(
                [...collection.filter((v) => v.getDataID() != record.getDataID()), record],
                collectionName
            );

            if (onCompleted) return onCompleted(data);
        });
    };

    const handleClick = (ev) => {
        if (onError) onError(false);
        else setError(false);

        commit({
            variables,
            onCompleted: linkRecordsParams ? linkRecords : onCompleted,
            onError(error) {
                if (onError) return onError(error.message);
                setError(error.message);
            },
        });
    };

    if (isInFlight) {
        return <CircularProgress />;
    }

    if (!!error) {
        return <Chip icon={<WarningIcon />} label={error} color="secondary" onDelete={(ev) => setError(false)} />;
    }

    return (
        <Button
            onClick={onClick ? onClick(handleClick) : handleClick}
            {...{ color: "primary", variant: "contained", ...otherProps }}
        >
            {label}
        </Button>
    );
};

MutationButton.defaultProps = {
    variables: {},
};

export default MutationButton;
