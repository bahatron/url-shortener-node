import { AsyncContext } from "@bahatron/utils/lib/context";
import { Logger } from "@bahatron/utils/lib/logger";
import { $config } from "./config";

export const $logger = Logger({
    id: () => AsyncContext.get("requestId"),
    pretty: $config.devMode,
});
