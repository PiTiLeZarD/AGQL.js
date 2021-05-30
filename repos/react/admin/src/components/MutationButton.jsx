import { useState } from "react";
import { Button, CircularProgress, Chip } from "@material-ui/core";
import WarningIcon from "@material-ui/icons/Warning";

import { useMutation, useRelayEnvironment, commitLocalUpdate } from "react-relay";

/**
 * `MutationButton` is an all managed button committing a graphql mutation using react-relay and manages inflight/errors
 */
const MutationButton = (props) => {
    const {
        mutation,
        variables,
        linkRecordsParams,
        onCompleted,
        onError,
        onClick,
        Component,
        children,
        ...otherProps
    } = props;

    const [commit, isInFlight] = useMutation(mutation);
    const [error, setError] = useState(false);

    const environment = useRelayEnvironment();
    const linkRecords = (data) => {
        const [nodeId, parent] = linkRecordsParams(data);

        commitLocalUpdate(environment, (store) => {
            const isDelete =
                mutation.operation.selections.filter((selection, si) => selection.name.includes("delete")).length > 0;

            const record = store.get(nodeId);
            const parentNode = parent
                .split(".")
                .slice(0, -1)
                .reduce((acc, elmt) => {
                    const match = elmt.match(/(.*)\[(.*)\]/);
                    if (match) {
                        const [_, group, id] = match;
                        return acc.getLinkedRecords(group).filter((e) => e.getDataID() == id)[0];
                    }
                    return acc.getLinkedRecord(elmt);
                }, store.getRoot());
            const collectionName = parent.split(".").splice(-1);
            const collection = (parentNode.getLinkedRecords(collectionName) || []).filter(
                (v) => v.getDataID() != record.getDataID()
            );

            if (isDelete) {
                parentNode.setLinkedRecords(collection, collectionName);
                store.delete(nodeId);
            } else {
                parentNode.setLinkedRecords([...collection, record], collectionName);
            }

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
        <Component
            onClick={onClick ? onClick(handleClick) : handleClick}
            {...{ color: "primary", variant: "contained", ...otherProps }}
        >
            {children}
        </Component>
    );
};

MutationButton.defaultProps = {
    variables: {},
    Component: Button,
};

export default MutationButton;
