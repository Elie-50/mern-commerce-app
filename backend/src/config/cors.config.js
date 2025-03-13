import { config } from "./env.config.js"

const corsOptions = {
    origin: `http://${config.host}:${config.port}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credenrials: true
};

export default corsOptions;