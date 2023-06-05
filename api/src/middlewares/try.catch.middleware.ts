/* eslint-disable no-console */

import { Response, Request } from 'express';

export async function tryCatchMiddlewareNotAPI(calback: unknown, successMsg: string) {
	try {
		await calback;
		console.log(successMsg);
	} catch (err) {
		console.log(err);
	}
}

export default async function tryCatchMiddlewareAPI(req: Request, res: Response, calback: unknown) {
	try {
		const response = await calback;
		res.status(200).send(response);
	} catch (err: unknown) {
		console.log(err);
		res.status(500).send(err);
	}
}