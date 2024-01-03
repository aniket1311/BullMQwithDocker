import { UserRoutes } from './user.route.js';

export default function routes(app: any) {
  app.use('/api/user', UserRoutes);
}
