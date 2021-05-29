import { Card, CardHeader, CardContent, CardActions } from "@material-ui/core";
import { graphql } from "react-relay";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import FormikMutationButton from "./FormikMutationButton";

const FieldForm = (props) => {
    const { entity_id, onCompleted } = props;

    return (
        <Formik initialValues={{ name: "", entity_id }}>
            <Form>
                <Card>
                    <CardHeader title="Add a new Field" />
                    <CardContent>
                        <Field name="name" component={TextField} label="Name" />
                        <Field name="entity_id" component={TextField} type="hidden" />
                    </CardContent>
                    <CardActions>
                        <FormikMutationButton
                            type="submit"
                            label="Save"
                            mutation={graphql`
                                mutation FieldFormAddMutation($input: FieldInput!) {
                                    createField(input: $input) {
                                        node {
                                            id
                                            name
                                        }
                                    }
                                }
                            `}
                            linkRecordsParams={({ createField }) => [
                                createField.node.id,
                                `entities[${entity_id}].fields`,
                            ]}
                            variables={(formikContext) => ({ input: formikContext })}
                            onCompleted={({ createField }) => {
                                if (onCompleted) onCompleted(createField.node);
                            }}
                        />
                    </CardActions>
                </Card>
            </Form>
        </Formik>
    );
};

export default FieldForm;