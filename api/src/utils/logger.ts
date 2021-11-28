import { AsyncContext } from "@bahatron/utils/lib/context";
import { Logger } from "@bahatron/utils/lib/logger";

export const $logger = Logger({
    id: () => AsyncContext.get("requestId"),
});
