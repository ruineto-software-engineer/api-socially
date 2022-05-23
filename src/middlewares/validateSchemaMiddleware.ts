import { NextFunction, Request, Response } from 'express';
import { stripHtml } from 'string-strip-html';
import authSchema from '../schemas/authSchema.js';
import followersSchema from '../schemas/followersSchema.js';
import messageSchema from '../schemas/messageSchema.js';
import postsSchema from '../schemas/postSchema.js';
import userSchema from '../schemas/userSchema.js';

function sanitizeString(string: string) {
	return stripHtml(string).result.trim();
}

const schemas = {
	'/sign-up': userSchema,
	'/sign-in': authSchema,
	'/posts': postsSchema,
	'/follow': followersSchema,
	'/unfollow': followersSchema,
	'/chat': messageSchema
};

export default async function validateSchemaMiddleware(req: Request, res: Response, next: NextFunction) {
	const { body } = req;

	const schema = schemas['/' + req.path.split('/')[1]];

	Object.keys(body).forEach((key) => {
		if (typeof body[key] === 'string') body[key] = sanitizeString(body[key]);
	});

	const validation = schema.validate(body, { abortEarly: false });
	if (validation.error) return res.status(422).send(validation.error.message);

	next();
}