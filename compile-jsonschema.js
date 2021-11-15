require("ts-node").register();
const { compile } = require("json-schema-to-typescript");
const $fs = require("fs");
const $path = require("path");

function getDirFiles(path) {
    return $fs
        .readdirSync(path)
        .reduce((files, name) => {
            const url = `${path}/${name}`;
            return $fs.lstatSync(url).isDirectory()
                ? files.concat(getDirFiles(url))
                : files.concat([url]);
        }, [])
        .filter((fileName) => fileName.endsWith(".schema.ts"))
        .map((path) => $path.resolve(path));
}

function compileInterface(path) {
    let fileName = $path.basename(path).split(".").shift();

    let schema = require(path).default;
    if (!schema) {
        return;
    }

    return new Promise((resolve) => {
        compile(schema, fileName)
            .then((compiledInterface) => {
                return $fs.writeFile(
                    path.replace(".schema.ts", ".interface.ts"),
                    compiledInterface,
                    resolve
                );
            })
            .then(() => console.log(`compiled ts schema from: ${path}`))
            .catch(console.error);
    });
}

let schemaFiles = getDirFiles($path.resolve(__dirname, "./src"));
schemaFiles.map(compileInterface)