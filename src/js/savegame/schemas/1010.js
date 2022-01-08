import { createLogger } from "../../core/logging.js";
import { SavegameInterface_V1009 } from "./1009.js";

const schema = require("./1010.json");
const logger = createLogger("savegame_interface/modloader");

export class SavegameInterface_V1010 extends SavegameInterface_V1009 {
    getVersion() {
        return 1010;
    }

    getSchemaUncached() {
        return schema;
    }

    /**
     * @param {import("../savegame_typedefs.js").SavegameData} data
     */
    static migrate1009to1010(data) {
        logger.log("Migrating 1009 to 1010");
        const dump = data.dump;
        if (!dump) {
            return true;
        }

        // Convert building codes to group with code
        for (let i = 0; i < dump.entities.length; i++) {
            dump.entities[i].components.StaticMapEntity.code =
                "vanilla:" + dump.entities[i].components.StaticMapEntity.code;
        }
    }
}
