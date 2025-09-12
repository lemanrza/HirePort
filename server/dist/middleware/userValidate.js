import { registerUserValidation } from "../validations/userValidations";
const userValidate = (req, _, next) => {
    const { error } = registerUserValidation.validate(req.body);
    if (error) {
        const errorMessage = error.details.map((err) => err.message).join(", ");
        throw new Error(errorMessage);
    }
    else {
        next();
    }
};
export default userValidate;
