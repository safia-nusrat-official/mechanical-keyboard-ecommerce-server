import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../interfaces/errors.interface';
import httpStatus from 'http-status';

export const handleZodError = (err: ZodError): TGenericErrorResponse => {
	console.log(err)
	const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
		return {
			path: issue?.path[issue.path.length - 1],
			message: issue?.message,
		};
	});

	const statusCode = httpStatus.BAD_REQUEST;
	return {
		statusCode,
		errMsg: 'zod validation error',
		errorSources,
	};
};
