import { useState } from "react";
import { Button, CircularProgress, Chip } from "@material-ui/core";
import WarningIcon from "@material-ui/icons/Warning";
import { useMutation, useRelayEnvironment, commitLocalUpdate } from "react-relay";

const MutationButton = (props) => {
    const { mutation, label, variables, linkRecordsParams, onCompleted, onError, onClick, ButtonProps } = props;

    const [commit, isInFlight] = useMutation(mutation);
    const [error, setError] = useState(false);

    const environment = useRelayEnvironment();
    const linkRecords = (data) => {
        const [nodeId, parent] = linkRecordsParams(data);
        commitLocalUpdate(environment, (store) => {
            const root = store.getRoot();
            const record = store.get(nodeId);
            const collection = root.getLinkedRecords(parent) || [];
            root.setLinkedRecords([...collection.filter((v) => v.getDataID() != record.getDataID()), record], parent);
            if (onCompleted) onCompleted(data);
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
            color="primary"
            variant="contained"
            {...ButtonProps}
        >
            {label}
        </Button>
    );
};

MutationButton.defaultProps = {
    variables: {},
};

export default MutationButton;
