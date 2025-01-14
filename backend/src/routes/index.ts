import {Router} from 'express';
import userRoutes from './user-routes.js';
import chatRoutes from './chat-routes.js';

const appRouter = Router();

appRouter.use("https://kasubay-ai-server2.vercel.app/api/v1/user", userRoutes);
appRouter.use("https://kasubay-ai-server2.vercel.app/api/v1/chat", chatRoutes);

export default appRouter;