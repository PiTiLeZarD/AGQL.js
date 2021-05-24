import { Card, CardHeader, CardContent, CardActions } from "@material-ui/core";
import { graphql } from "react-relay";
import { Formik, Form, Field, useFormikContext } from "formik";
import { TextField } from "formik-material-ui";
import MutationButton from "./MutationButton";

const SaveButton = (props) => {
    const { onError, onCompleted } = props;
    const { values } = useFormikContext();

    return (
        <MutationButton
            label="Save"
            mutation={graphql`
                mutation EntityFormAddMutation($input: EntityInput!) {
                    createEntity(input: $input) {
                        node {
                            id
                            name
                        }
                    }
                }
            `}
            linkRecordsParams={({ createEntity }) => [createEntity.node.id, "entities"]}
            variables={{ input: values }}
            onCompleted={({ createEntity }) => {
                if (onCompleted) onCompleted(createEntity.node);
            }}
            onError={onError}
            ButtonProps={{
                variant: "contained",
                color: "primary",
                type: "submit",
            }}
        />
    );
};

const EntityForm = (props) => {
    const { onCompleted } = props;

    return (
        <Formik initialValues={{ name: "" }}>
            <Form>
                <Card>
                    <CardHeader title="Add a new Entity" />
                    <CardContent>
                        <Field name="name" component={TextField} label="Name" />
                    </CardContent>
                    <CardActions>
                        <SaveButton onCompleted={onCompleted} />
                    </CardActions>
                </Card>
            </Form>
        </Formik>
    );
};

export default EntityForm;
