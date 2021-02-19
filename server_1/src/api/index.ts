import { Router } from 'express';
import contact from './routes/contact';
import seeder from './routes/seeder';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	contact(app);
	seeder(app);
	
	return app
}