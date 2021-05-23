import { useState } from "react";
import { Button, CircularProgress, Chip } from "@material-ui/core";
import WarningIcon from "@material-ui/icons/Warning";
import { useMutation } from "react-relay";

const MutationButton = (props) => {
    const { mutation, label, variables, onCompleted, onError, onClick, ButtonProps } = props;

    const [commit, isInFlight] = useMutation(mutation);
    const [error, setError] = useState(false);

    const handleClick = (ev) => {
        if (onError) onError(false);
        else setError(false);

        commit({
            variables,
            onCompleted,
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
