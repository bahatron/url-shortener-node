import { $axios } from "../utils/axios";
import { $config } from "../utils/config";

describe("GET /ping", () => {
    it("returns http 200", async () => {
        let res = await $axios.get(`${$config.testUrl}/ping`);

        expect(res.status).toEqual(200);
        expect(res.data).toEqual(`pong`);
    });
});
