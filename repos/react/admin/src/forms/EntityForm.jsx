import { Card, CardHeader, CardContent, CardActions } from "@material-ui/core";
import { graphql } from "react-relay";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";

import { FormikMutationButton } from "../components";

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
                        <FormikMutationButton
                            type="submit"
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
                            variables={(formikContext) => ({ input: formikContext })}
                            onCompleted={({ createEntity }) => {
                                if (onCompleted) onCompleted(createEntity.node);
                            }}
                        >
                            Save
                        </FormikMutationButton>
                    </CardActions>
                </Card>
            </Form>
        </Formik>
    );
};

export default EntityForm;
