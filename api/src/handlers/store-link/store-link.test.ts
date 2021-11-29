import { AxiosResponse } from "axios";
import { $links } from "../../services/link.repository";
import { $axios } from "../../utils/axios";
import { $config } from "../../utils/config";

describe(`POST /shorten`, () => {
    beforeAll(async () => {
        await $links.knex().truncate();
    });

    describe("Given an invalid request payload", () => {
        it("response with http 400", async () => {
            let res: AxiosResponse = await $axios
                .post(`${$config.testUrl}/shorten`, { foo: "bar" })
                .catch((err) => err.response);

            expect(res.status).toBe(400);
        });
    });

    describe("Given an invalid request payload", () => {
        it("response with http 400", async () => {
            let res: AxiosResponse = await $axios
                .post(`${$config.testUrl}/shorten`, {
                    url: "this_is_not_an_url",
                })
                .catch((err) => err.response);

            expect(res.status).toBe(400);
        });
    });

    describe("Given a valid payload", () => {
        let res: AxiosResponse;
        let url = "https://google.com";

        beforeAll(async () => {
            res = await $axios.post(`${$config.testUrl}/shorten`, {
                url,
            });
        });

        it("responds with http 200", () => {
            expect(res.status).toBe(200);
        });

        it("responds with a 6 characters long string", () => {
            expect(typeof res.data).toBe("string");
            expect(res.data).toHaveLength(6);
        });

        it("stores a record in database", async () => {
            let record = await $links
                .knex()
                .where({ originalUrl: url })
                .first();

            expect(record).toBeDefined();
            expect(record?.shortenedUrl).toEqual(res.data);
        });

        it("returns the same string if the url has already been saved", async () => {
            let { data } = await $axios.post(`${$config.testUrl}/shorten`, {
                url,
            });

            expect(data).toEqual(res.data);
        });
    });
});
