docker_compose(["./docker-compose.tilt.yml"])

docker_build(
    "local/api",
    ".",
    dockerfile = "Dockerfile.api",
    live_update = [
        fall_back_on("./package.json"),
        sync(".", "/app")
    ],
    target="src",
    ignore=[
        "./postgres"
    ]
)

watch_settings(
    ignore=[
        "./src/interfaces"
    ]
)