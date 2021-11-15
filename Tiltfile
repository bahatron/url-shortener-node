docker_compose(["./docker-compose.tilt.yml"])

docker_build(
    "server",
    ".",
    dockerfile = "Dockerfile.server",
    live_update = [
        fall_back_on("./package.json"),
        sync(".", "/app")
    ]
)