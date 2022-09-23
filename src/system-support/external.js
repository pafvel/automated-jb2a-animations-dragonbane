import systemData from "../system-handlers/system-data.js";
import { AnimationState } from "../AnimationState.js";
import { trafficCop } from "../router/traffic-cop.js";
import { custom_warning } from "../constants/constants.js";
/**
 *  AutoAnimations class allows for external calls to directly play animations
 * 
 *  @param {Object} sourceToken // The Token using the item
 *  @param {Array} targets // An array of targets
 *  @param {Object} item // The item being used, or a false item with at least {name: "ItemName"} for Autorec
 *  @param {Object} options
 * 
 *  Options include anything from system-data.js to override settings. Most common being:
 *  @param {Number} reachCheck // Reach for Source Token
 *  @param {Boolean} playOnMiss // Animation should play on Misses
 *  @param {Optional} hitTargets // Array or Set of tokens that are "hit"
 *  @param {Object} templateData // Pass a template to the system handler, undefined by default until a Template animation is played
 *
 */
export class AutoAnimations
{
    static async playAnimation(sourceToken, targets, item, options = {}) {
        custom_warning("AutoAnimations.playAnimation is deprecated in favor of AutomatedAnimations.PlayAnimation. This will be removed in Version 5")
        if (!AnimationState.enabled) { return; }
        if (!Array.isArray(targets)) {
            targets = Array.from(targets)
        }
        const data = {
            token: sourceToken,
            targets: targets,
            item: item,
            ...options
        }

        let handler = await systemData.make(null, null, data)
        trafficCop(handler);
    }
}

export async function playAnimation(options = {}) {
    if (!options) { return; }

    let {sourceToken, targets, item, ...rest} = options;

    if (!sourceToken || !targets || !item) { return; }

    if (!AnimationState.enabled) { return; }
    if (!Array.isArray(targets)) {
        targets = Array.from(targets)
    }
    const data = {
        token: sourceToken,
        targets: targets,
        item: item,
        ...rest
    }

    let handler = await systemData.make(null, null, data)
    trafficCop(handler);
}
