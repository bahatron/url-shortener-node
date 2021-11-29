docker_compose(["./docker-compose.tilt.yml"])

docker_build(
    "local/api",
    ".",
    dockerfile = "Dockerfile.api",
    live_update = [
        fall_back_on("./api/package.json"),
        sync("./api", "/app/api")
    ],
    target="src",
    only=[
        "api/"
    ],
)

watch_settings(
    ignore=[
        "./api/src/interfaces"
    ]
)