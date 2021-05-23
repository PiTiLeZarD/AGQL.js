import { Card, CardHeader, CardContent, CardActions } from "@material-ui/core";
import { graphql } from "react-relay";
import { Formik, Form, Field, useFormikContext } from "formik";
import { TextField } from "formik-material-ui";
import MutationButton from "./MutationButton";

const SaveButton = (props) => {
    const { onError } = props;
    const { values } = useFormikContext();

    return (
        <MutationButton
            label="Save"
            mutation={graphql`
                mutation EntityFormSaveMutation($input: EntityInput!) {
                    createEntity(input: $input) {
                        _id
                        name
                    }
                }
            `}
            variables={{ input: values }}
            onCompleted={(params) => {
                console.log("onCompleted", params);
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
    return (
        <Formik initialValues={{ name: "" }}>
            <Form>
                <Card>
                    <CardHeader title="Add a new Entity" />
                    <CardContent>
                        <Field name="name" component={TextField} label="Name" />
                    </CardContent>
                    <CardActions>
                        <SaveButton onError={() => console.error(arguments)} />
                    </CardActions>
                </Card>
            </Form>
        </Formik>
    );
};

export default EntityForm;
