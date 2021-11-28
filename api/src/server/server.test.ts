import axios from "axios";

describe("server", () => {
    it("works", async () => {
        let res = await axios.get(`http://localhost:3000/ping`);

        expect(res.status).toEqual(200);
        expect(res.data).toEqual(`pong`);
    });
});
