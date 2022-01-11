import { init } from "./init";
import { upgrade } from "./upgrade";

export async function cli(args) {
    // TODO: nice info
    if (args[2] === "init") {
        init(args.filter(x => x !== "init"));
    } else if (args[2] === "upgrade") {
        upgrade(args.filter(x => x !== "upgrade"));
    }
}
