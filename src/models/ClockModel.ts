export enum EditMode {
  NONE,
  HOURS,
  MINUTES
}

type TickCallback = (hours: number, minutes: number, seconds: number) => void;
type ModeChangeCallback = (mode: EditMode) => void;
type FormatCallback = (is24h: boolean) => void;
type VoidCallBack = () => void;

export class ClockModel {
  private offset: number
  private date: Date;
  private editMode: EditMode = EditMode.NONE;
  private tickCb: TickCallback[] = [];
  private modeCb: ModeChangeCallback[] = [];
  private is24h = true
  private formatCb: FormatCallback[] = []
  private resetCb: TickCallback[] = [];


  constructor(offset: number) {
    this.offset = offset
    const now = new Date()
    this.date = new Date(now.getTime() + offset * 3600_000)
  }

  onTick(cb: TickCallback): void {
    this.tickCb.push(cb);
  }

  onFormatChange(cb: FormatCallback) {
    this.formatCb.push(cb)
  }

  onModeChange(cb: ModeChangeCallback): void {
    this.modeCb.push(cb);
  }
  onResetChange(cb: TickCallback) {
    this.resetCb.push(cb)
  }

  private emitTick(): void {
    const { hours, minutes, seconds } = this.getTime();
    this.tickCb.forEach(cb => cb(hours, minutes, seconds));
  }

  public tick() {
    this.date.setSeconds(this.date.getSeconds() + 1)
    this.emitTick()
  }

  getTime(): { hours: number; minutes: number; seconds: number } {
    return {
      hours: this.date.getHours(),
      minutes: this.date.getMinutes(),
      seconds: this.date.getSeconds(),
    };
  }

  getMode(): EditMode {
    return this.editMode;
  }

  cycleEditMode(): void {
    if (this.editMode === EditMode.NONE) {
      this.editMode = EditMode.HOURS;
    } else if (this.editMode === EditMode.HOURS) {
      this.editMode = EditMode.MINUTES;
    } else {
      this.editMode = EditMode.NONE;
    }
    this.modeCb.forEach(cb => cb(this.editMode));
  }

  increase(): void {
    if (this.editMode === EditMode.HOURS) {
      this.date.setHours((this.date.getHours() + 1) % 24);
    } else if (this.editMode === EditMode.MINUTES) {
      const m = this.date.getMinutes();
      if (m === 59) {
        this.date.setMinutes(0);
        this.date.setHours((this.date.getHours() + 1) % 24);
      } else {
        this.date.setMinutes(m + 1);
      }
    }
    this.emitTick();
  }

  changeFormat() {
    this.is24h = !this.is24h
    this.formatCb.forEach(cb => { cb(this.is24h) });
  }

  public reset() {
    const now = new Date();
    this.date = new Date(now.getTime() + this.offset * 3600_000)
    this.resetCb.forEach(cb => cb(this.date.getHours(), this.date.getMinutes(), this.date.getSeconds()))
  }

  public getFormat() {
    return this.is24h
  }
  public getEditMode() {
    return this.editMode
  }

}