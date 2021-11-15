export const LinkSchema = {
    type: "object",
    additionalProperties: false,
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
