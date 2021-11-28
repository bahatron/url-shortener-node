#!/usr/bin/node

const { execSync } = require("child_process");
const exit = (code) => process.exit(code);
const exec = (command, env) => execSync(command, { stdio: [0, 1, 2], env });
const argv = process.argv.slice(2);
const argsContains = (flag) => {
    return Array.isArray(flag)
        ? flag.some((val) => argv.includes(val))
        : argv.includes(flag);
};

const TILT_COMPOSE = "docker-compose.tilt.yml";

function tiltDown() {
    exec(`docker-compose -f ${TILT_COMPOSE} down && tilt down`);
}

if (argsContains(["dev", "up"])) {
    if (argsContains(["-c", "--clean"])) {
        tiltDown();
    }

    exec(`tilt up --hud`);
    tiltDown();
    exit(0);
}
