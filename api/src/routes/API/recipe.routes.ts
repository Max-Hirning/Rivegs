import { Router, Request, Response } from 'express';
import recipeController from '../../controller/recipe.controller';
import { recipeUpload } from '../../middlewares/upload.middleware';
import tryCatchMiddlewareAPI from '../../middlewares/try.catch.middleware';

const router: Router = Router();

router.get(`/`, async (req: Request, res: Response) => tryCatchMiddlewareAPI(req, res, recipeController.get(req)));
router.delete(`/:id`, async (req: Request, res: Response) => tryCatchMiddlewareAPI(req, res, recipeController.delete(req)));
router.get(`/languages`, async (req: Request, res: Response) => tryCatchMiddlewareAPI(req, res, recipeController.getLanguages()));
router.get(`/author/:id`, async (req: Request, res: Response) => tryCatchMiddlewareAPI(req, res, recipeController.getByAuthor(req)));
router.put(`/rating/:id`, async (req: Request, res: Response) => tryCatchMiddlewareAPI(req, res, recipeController.changeRating(req)));
router.get(`/recipe/:id`, async (req: Request, res: Response) => tryCatchMiddlewareAPI(req, res, recipeController.getOneRecipeById(req)));
router.get(`/saved-recipes/`, async (req: Request, res: Response) => tryCatchMiddlewareAPI(req, res, recipeController.getSavedRecipes(req)));
router.get(`/edit-recipe/:id`, async (req: Request, res: Response) => tryCatchMiddlewareAPI(req, res, recipeController.getOneEditRecipeById(req)));
router.post(`/`, recipeUpload.single(`image`), async (req: Request, res: Response) => tryCatchMiddlewareAPI(req, res, recipeController.post(req)));
router.put(`/:id`, recipeUpload.single(`image`), async (req: Request, res: Response) => tryCatchMiddlewareAPI(req, res, recipeController.put(req)));

export default router;