//handle email or usename duplicates
const handleDuplicateKeyError = (err) => {
  const field = Object.keys(err.keyValue);
  const message = `An account with this ${field} already exists.`;
  return { message, field, status: 409 };
};
//handle field formatting, empty fields, and mismatched passwords
const handleValidationError = (err) => {
  let errors = Object.values(err.errors).map((el) => el.message);
  let fields = Object.values(err.errors).map((el) => el.path);
  if (errors.length > 1) {
    const formattedErrors = errors.join("");
    return { message: formattedErrors, fields: fields, status: 400 };
  } else {
    return { message: errors, fields: fields, status: 409 };
  }
};
//error controller function
export default async (err) => {
  try {
    if (err.name === "ValidationError") return handleValidationError(err);
    if (err.code && err.code == 11000) return handleDuplicateKeyError(err);
    else return { message: err.message || err , status: 500};
  } catch (e) {
    return { message: (e).message ?? e, status: 500 };
  }
};
