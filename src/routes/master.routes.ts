import { Router } from 'express';
import GroupedItemTypesRouter from './groupedItemTypes.routes';
import ItemRouter from './item.routes';
import ItemTypeRouter from './itemTypes.routes';

const Routes = Router();

Routes.use(ItemTypeRouter);
Routes.use(GroupedItemTypesRouter);
Routes.use(ItemRouter);

export = Routes;