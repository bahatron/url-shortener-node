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
            name: "api-server",
            script: "dist/bin/api-server.js",
            watch: ["dist"],
            ...LOG_OPTIONS,
        },
    ],
};
