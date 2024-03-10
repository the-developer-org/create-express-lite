const app = require("./app");
const config = require("./config/config");
const Logger = require("./util/logger");
require("dotenv").config();

const PORT = config.port;
app.listen(PORT, () => {
    Logger.info(`Server is running at ${PORT}`);
});
