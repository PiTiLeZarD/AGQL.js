import MutationButton from "./MutationButton";
import { useFormikContext } from "formik";

const FormikMutationButton = (props) => {
    const { variables, ...otherProps } = props;

    const { values } = useFormikContext();

    return <MutationButton variables={variables(values)} {...otherProps} />;
};

export default FormikMutationButton;
