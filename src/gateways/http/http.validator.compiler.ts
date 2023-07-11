import { Schema, ValidationError } from 'joi';

interface CustomValidationError extends ValidationError{
  validation?: boolean
}

const validatorCompiler = ({ schema }: { schema: Schema }) => (data: object) => {
  const { value, error } = schema.validate(data);

  if (error) (error as CustomValidationError).validation = true;

  return { value, error };
};

export default validatorCompiler;
