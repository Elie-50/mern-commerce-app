import app from './src/app.js';
import { connectDB } from './src/config/db.config.js';
import { config } from './src/config/env.config.js';

app.listen(config.port, async() => {
    await connectDB();

    console.log(`Server is running on http://${config.host}:${config.port}`);
});

