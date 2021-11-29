import { randomString } from "./random-string";

describe("Random String generator", () => {
    it("generates random string with the specified length", () => {
        let strings = Array(10)
            .fill(null)
            .map(() => randomString(6));

        for (let str of strings) {
            expect(str).toHaveLength(6);
        }
    });

    it("generates different strings", () => {
        let strings = Array(20)
            .fill(null)
            .map(() => randomString());

        expect(Array.from(new Set(strings)).length).toEqual(strings.length);
    });
});
