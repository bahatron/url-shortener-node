export const LinkSchema = {
    type: "object",
    additionalProperties: false,
    required: ["originalUrl", "shortenedUrl"],
    properties: {
        originalUrl: {
            type: "string",
        },
        shortenedUrl: {
            type: "string",
        },
    },
};

export default LinkSchema;
