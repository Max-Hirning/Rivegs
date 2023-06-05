import userRouter from './API/user.routes';
import recipeRouter from './API/recipe.routes';
import { Application, Response, Request } from 'express';

class AppRouter {
	constructor(private app: Application) {}
	init() {
		this.app.get(`/`, (_req: Request, res: Response): void => {
			res.send(`API Running`);
		});
		this.app.use(`/api/users`, userRouter);
		this.app.use(`/api/recipes`, recipeRouter);
	}
}

export default AppRouter;