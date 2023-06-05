import { Router, Request, Response } from 'express';
import userController from '../../controller/user.controller';
import { avatarUpload } from '../../middlewares/upload.middleware';
import tryCatchMiddlewareAPI from '../../middlewares/try.catch.middleware';

const router: Router = Router();

router.get(`/:id`, async (req: Request, res: Response) => tryCatchMiddlewareAPI(req, res, userController.get(req)));
router.delete(`/:id`, async (req: Request, res: Response) => tryCatchMiddlewareAPI(req, res, userController.delete(req)));
router.post(`/sign-in`, async (req: Request, res: Response) => tryCatchMiddlewareAPI(req, res, userController.signIn(req)));
router.post(`/sign-up`, async (req: Request, res: Response) => tryCatchMiddlewareAPI(req, res, userController.signUp(req)));
router.put(`/recipes/:id`, async (req: Request, res: Response) => tryCatchMiddlewareAPI(req, res, userController.saveUnsaveRecipe(req)));
router.put(`/:id`, avatarUpload.single(`avatar`), async (req: Request, res: Response) => tryCatchMiddlewareAPI(req, res, userController.changeProfile(req)));

export default router;