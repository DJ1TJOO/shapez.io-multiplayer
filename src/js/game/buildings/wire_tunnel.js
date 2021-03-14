import { WireTunnelComponent } from "../components/wire_tunnel";
import { Entity } from "../entity";
import { MetaBuilding } from "../meta_building";
import { DefaultWireTunnelVariant } from "./variants/wire_tunnel";

export class MetaWireTunnelBuilding extends MetaBuilding {
    constructor() {
        super("wire_tunnel");
    }

    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        MetaWireTunnelBuilding.setupEntityComponents.forEach(func => func(entity));
    }
}

MetaWireTunnelBuilding.variants = [DefaultWireTunnelVariant];

MetaWireTunnelBuilding.setupEntityComponents = [entity => entity.addComponent(new WireTunnelComponent())];
