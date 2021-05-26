import MutationButton from "./MutationButton";
import { useFormikContext } from "formik";

const FormikMutationButton = (props) => {
    const { variables, ...otherProps } = props;

    const { values, validateForm } = useFormikContext();

    const handleClick = (next) => (ev) => {
        if (otherProps.type == "submit")
            return validateForm().then((errors) => {
                if (Object.keys(errors).length == 0) {
                    return next();
                }
            });
        return next();
    };

    return <MutationButton variables={variables(values)} {...otherProps} onClick={handleClick} />;
};

export default FormikMutationButton;
