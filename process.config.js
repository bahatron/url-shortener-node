module.exports = {
    apps: [
        {
            name: "server",
            script: "dist/index.js",
            watch: ["dist"],
        },
    ],
};
