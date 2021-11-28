const LOG_OPTIONS = {
    out_file: "/dev/null",
    error_file: "/dev/null",
};

module.exports = {
    apps: [
        {
            name: "dev-watcher",
            script: "npm",
            args: ["run", "build"],
            autorestart: false,
            watch: ["src"],
            ignore_watch: ["**/*.interface.ts"],
            ...LOG_OPTIONS,
        },
        {
            name: "express-api",
            script: "dist/bin/express-api.js",
            watch: ["dist"],
            ...LOG_OPTIONS,
        },
    ],
};
