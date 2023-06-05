import { recipeTypes } from '../recipes';
import { SearchConfigI } from '../../types/redux/searchConfig';

export const searchConfigStore: SearchConfigI = {
  page: 1,
  type: (recipeTypes[0]).toLowerCase(),
};