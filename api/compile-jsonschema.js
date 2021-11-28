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

/**
 * creates interface file into a folder
 * @todo: use any of the other methods, this one is ugly
 */
function compileIntoFolder({ path, compiledInterface }) {
    return new Promise((resolve) => {
        let fileName = $path.basename(path);

        return $fs.writeFile(
            $path.resolve(
                process.cwd(),
                "./src/interfaces",
                fileName.replace(".schema.ts", ".interface.ts")
            ),
            compiledInterface,
            resolve
        );
    });
}

/**
 * creates interface file next to schema file
 * @todo can't extract interface file from Docker container through mounts
 */
function compileNextToFile({ path, compiledInterface }) {
    return new Promise((resolve) => {
        return $fs.writeFile(
            path.replace(".schema.ts", ".interface.ts"),
            compiledInterface,
            resolve
        );
    });
}

/**
 * adds interface to schema file
 * @todo it keeps adding the interface on top of the previously compiled one
 */
function compileIntoSameFile({ path, compiledInterface }) {
    return new Promise((resolve) => {
        $fs.readFile(path, (err, schemaSource) => {
            $fs.writeFile(
                path,
                compiledInterface.concat([`\n`, schemaSource]),
                resolve
            );
        });
    });
}

function compileInterface(path) {
    let fileName = $path.basename(path).split(".").shift();
    let schema = require(path).default;
    if (!schema) {
        return;
    }

    return new Promise(() => {
        compile(schema, fileName)
            .then((compiledInterface) => {
                return compileIntoFolder({ path, compiledInterface });
            })
            .then(() => console.log(`compiled ts interface from: ${path}`))
            .catch(console.error);
    });
}

let schemaFiles = getDirFiles($path.resolve(__dirname, "./src"));
Promise.all(schemaFiles.map(compileInterface)).then(() => {
    console.log(`JSON Schemas compiled to TypeScript`);
});
