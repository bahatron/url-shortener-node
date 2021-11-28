import axios from "axios";
import { $config } from "../utils/config";

describe("GET /ping", () => {
    it("returns http 200", async () => {
        let res = await axios.get(`${$config.test_url}/ping`);

        expect(res.status).toEqual(200);
        expect(res.data).toEqual(`pong`);
    });
});
