export const StoreLinkRequest = {
    type: "objection",
    required: ["url"],
    properties: {
        url: {
            type: "string",
            format: "uri",
        },
    },
};

export default StoreLinkRequest;
