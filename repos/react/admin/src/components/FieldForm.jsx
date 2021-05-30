import { Card, CardHeader, CardContent, CardActions, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import { graphql } from "react-relay";
import { Formik, Form, Field } from "formik";
import { TextField, Select } from "formik-material-ui";
import FormikMutationButton from "./FormikMutationButton";

const FieldForm = (props) => {
    const { entity_id, onCompleted } = props;

    return (
        <Formik initialValues={{ name: "", type: "String", entity_id }}>
            <Form>
                <Card>
                    <CardHeader title="Add a new Field" />
                    <CardContent>
                        <div>
                            <Field name="name" component={TextField} label="Name" />
                        </div>
                        <div>
                            <FormControl style={{ width: "100%" }}>
                                <InputLabel htmlFor="type">Type</InputLabel>
                                <Field component={Select} name="type" inputProps={{ id: "type" }}>
                                    <MenuItem value="String">String</MenuItem>
                                    <MenuItem value="Integer">Integer</MenuItem>
                                </Field>
                            </FormControl>
                        </div>
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
                                            type
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
