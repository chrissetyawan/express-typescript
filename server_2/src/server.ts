import app from "./app";
require('dotenv').config();

const PORT = process.env.APP_PORT || 8001;

app.listen(PORT, () => console.log(`App listening on port ${PORT} => http://127.0.0.1:${PORT}/api`));