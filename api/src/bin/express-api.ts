import { $postgres } from "../services/postgres";
import { $logger } from "../utils/logger";
import { Server } from "../server/server";

let app = Server();


$logger.info(`starting server...`);
$postgres.migrate.latest().then(() => {
    $logger.info(`Database migration complete`);

    app.listen(3000, () => {
        $logger.info(`server listening on port 3000`);
    });
});
