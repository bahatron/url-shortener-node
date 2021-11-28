docker_compose(["./docker-compose.tilt.yml"])

docker_build(
    "local/api",
    ".",
    dockerfile = "Dockerfile.api",
    live_update = [
        fall_back_on("./api/package.json"),
        sync("./api", "/app/api")
    ],
    ignore=[
        "api/src/interfaces",
    ],
    target="src",
    only=[
        "api/"
    ],
)