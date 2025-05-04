import { ClockModel } from "../models/ClockModel";
import { ClockView } from "../views/ClockView";

export class ClockController {
  constructor(model: ClockModel, view: ClockView, onRemove: () => void) {
    model.onTick((h, m, s) => view.renderTime(h, m, s, model.getFormat()));
    model.onModeChange(mode => view.updateBlinking(mode));
    model.onFormatChange(is24h => view.renderTime(model.getTime().hours, model.getTime().minutes, model.getTime().seconds, is24h))
    model. onResetChange((h, m, s) => view.renderTime(h, m, s, model.getFormat()))

    view.onModeClick(() => model.cycleEditMode());
    view.onIncreaseClick(() => model.increase());
    view.onLightClick(() => view.toggleLightMode());
    view.onFormatClick(() => model.changeFormat())
    view.onResetClick(() => model.reset())
    view.onRemoveClick(() => onRemove())
  }
}