import { Card, CardHeader, CardContent, CardActions, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import { graphql } from "react-relay";
import { Formik, Form, Field } from "formik";
import { TextField, Select } from "formik-material-ui";

import { FormikMutationButton } from "../components";

const updateMutation = graphql`
    mutation FieldFormSaveMutation($input: FieldInput!) {
        updateField(input: $input) {
            node {
                id
                name
                type
            }
        }
    }
`;

const createMutation = graphql`
    mutation FieldFormAddMutation($input: FieldInput!) {
        createField(input: $input) {
            node {
                id
                name
                type
            }
        }
    }
`;

const ActionButton = (props) => {
    const { entity_id, returnKey, mutation, onCompleted, children } = props;

    return (
        <FormikMutationButton
            type="submit"
            mutation={mutation}
            linkRecordsParams={(props) => [props[returnKey].node.id, `entities[${entity_id}].fields`]}
            variables={(formikContext) => ({ input: formikContext })}
            onCompleted={(props) => {
                if (onCompleted) onCompleted(props[returnKey].node);
            }}
        >
            {children}
        </FormikMutationButton>
    );
};

const FieldForm = (props) => {
    const { entity_id, field, onCompleted } = props;

    return (
        <Formik initialValues={{ id: "", name: "", type: "String", ...(field || {}), entity_id }}>
            <Form>
                <Card>
                    <CardHeader title={field ? `Update a Field` : `Add a new Field`} />
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
                        <Field name="id" component={TextField} type="hidden" />
                        <Field name="entity_id" component={TextField} type="hidden" />
                    </CardContent>
                    <CardActions>
                        {field && (
                            <ActionButton
                                entity_id={entity_id}
                                mutation={updateMutation}
                                returnKey="updateField"
                                onCompleted={onCompleted}
                            >
                                Save
                            </ActionButton>
                        )}
                        {!field && (
                            <ActionButton
                                entity_id={entity_id}
                                mutation={createMutation}
                                returnKey="createField"
                                onCompleted={onCompleted}
                            >
                                Add
                            </ActionButton>
                        )}
                    </CardActions>
                </Card>
            </Form>
        </Formik>
    );
};

export default FieldForm;
