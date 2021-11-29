import { AxiosResponse } from "axios";
import { $axios } from "../../utils/axios";
import { $config } from "../../utils/config";
import { storeLink } from "../store-link/store-link";

describe("GET /:shortenedUrl", () => {
    describe("Given an unexistent URL", () => {
        it("returns http 404", async () => {
            let res = (await $axios
                .get(`${$config.testUrl}/iDontExist`)
                .catch((err) => err.response)) as AxiosResponse;

            expect(res.status).toBe(404);
        });
    });

    describe("Given an existent shortened url", () => {
        let shortened: string;

        beforeAll(async () => {
            shortened = await storeLink(`https://google.com`);
        });

        it("redirect to the original url", async () => {
            let res = await $axios.get(`${$config.testUrl}/${shortened}`);

            expect(res.request.res.responseUrl).toBe(`https://www.google.com/`);
        });
    });
});
