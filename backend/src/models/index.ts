import { sequelize } from '../config/database';
import { initUserModel } from './user';
import { initFavoriteModel } from './favorite';
import { initSearchModel } from './search';

export const User = initUserModel(sequelize);
export const Favorite = initFavoriteModel(sequelize);
export const Search = initSearchModel(sequelize);