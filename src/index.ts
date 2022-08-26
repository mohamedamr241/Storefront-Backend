import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mythical_weapons_routes from './handlers/products';
import users_routes from './handlers/users';
import order_routes from './handlers/orders';

const app: express.Application = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to our store');
});

mythical_weapons_routes(app);
users_routes(app);
order_routes(app);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
export default app;
