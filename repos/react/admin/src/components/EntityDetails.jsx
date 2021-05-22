import { useFragment, graphql } from "react-relay";
import { Card, CardContent, CardHeader, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const EntityDetails = (props) => {
    const { data } = props;

    const entity = useFragment(
        graphql`
            fragment EntityDetails_entity on Entity {
                _id
                name
            }
        `,
        data
    );

    return (
        <Card>
            <CardHeader
                title={`${entity._id}: ${entity.name}`}
                subheader={`Other informations`}
                action={
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                }
            />
            <CardContent>Here fields and links</CardContent>
        </Card>
    );
};

export default EntityDetails;
