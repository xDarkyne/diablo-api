import { Router, Response, Request } from 'express';
import { CustomItemTypesController } from '../controllers';

const GroupedItemTypesRouter = Router();

GroupedItemTypesRouter.get('/:region/:locale/v1/item-types/', (req: Request, res: Response) => CustomItemTypesController.getGroupedItemTypeIndex(req, res));
GroupedItemTypesRouter.get('/:region/:locale/v1/item-types/:type', (req: Request, res: Response) => CustomItemTypesController.getGroupedItemType(req, res));
GroupedItemTypesRouter.get('/:region/:locale/v1/item-types/:type/:search', (req: Request, res: Response) => CustomItemTypesController.getGroupedItemType(req, res));
GroupedItemTypesRouter.get('/:region/:locale/v1/item-types/:type/:property/:search', (req: Request, res: Response) => CustomItemTypesController.getGroupedItemType(req, res));

GroupedItemTypesRouter.get('/:region/:locale/v1/all-items/', (req: Request, res: Response) => CustomItemTypesController.getAllItemTypes(req, res));
GroupedItemTypesRouter.get('/:region/:locale/v1/all-items/:search', (req: Request, res: Response) => CustomItemTypesController.getItemByName(req, res));
GroupedItemTypesRouter.get('/:region/:locale/v1/all-items/:property/:search', (req: Request, res: Response) => CustomItemTypesController.getItemByName(req, res));

export = GroupedItemTypesRouter;