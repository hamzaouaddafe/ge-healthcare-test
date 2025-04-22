import { ClockModel } from "../models/ClockModel";
import { AnalogClockView } from "../views/AnalogClockView";

export class AnalogClockController {
    constructor(model: ClockModel, view: AnalogClockView, onRemove: () => void) {

        model.onTick((h,m,s) => view.renderTime(h,m,s))
        view.onRemoveClick(() => onRemove())
    }
}