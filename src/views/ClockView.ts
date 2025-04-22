import { EditMode } from "../models/ClockModel"

export class ClockView {
  private container: HTMLElement;
  private display: HTMLElement;
  private hourEl: HTMLSpanElement;
  private minuteEl: HTMLSpanElement;
  private secondEl: HTMLSpanElement;
  private is24hEl: HTMLSpanElement;
  private modeBtn: HTMLButtonElement;
  private increaseBtn: HTMLButtonElement;
  private lightBtn: HTMLButtonElement;
  private formatButton: HTMLButtonElement
  private resetButton: HTMLButtonElement
  private removeButton: HTMLButtonElement

  constructor(container: HTMLElement) {
    this.container = container;
    this.container.innerHTML = `
        <div class="display">
          <span id="hour">00</span>:<span id="minute">00</span>:<span id="second">00</span><span class="is24h" id="is24h"></span>
        </div>
        <div class="button-row">
          <button id="mode" class="mode" >Mode</button>
          <button id="increase" class="increase" >+</button>
          <button id="format" class="format" >24H / AM-PM</button>
          <button id="reset" class="reset" >Reset</button>
          <button id="remove" class="remove" >Remove</button>
          <button id="light" class="light">Light</button>
        </div>
    `
    this.display = this.container.querySelector(".display");
    this.hourEl = this.container.querySelector("#hour");
    this.minuteEl = this.container.querySelector("#minute");
    this.secondEl = this.container.querySelector("#second");
    this.is24hEl = this.container.querySelector("#is24h");

    this.modeBtn = this.container.querySelector("#mode")
    this.increaseBtn = this.container.querySelector("#increase");
    this.lightBtn = this.container.querySelector("#light");
    this.formatButton = this.container.querySelector('#format')
    this.resetButton = this.container.querySelector('#reset')
    this.removeButton = this.container.querySelector('#remove')
  }

  renderTime(hours: number, minutes: number, seconds: number, is24h: boolean): void {
    const hourDisplay = is24h ? hours : ((hours % 12) || 12)
    this.is24hEl.innerText = is24h ? "" : hours >= 12 ? " PM" : " AM" 
    this.hourEl!.textContent = hourDisplay.toString().padStart(2, "0");
    this.minuteEl!.textContent = minutes.toString().padStart(2, "0");
    this.secondEl!.textContent = seconds.toString().padStart(2, "0");
  }

  updateBlinking(mode: EditMode): void {
    this.hourEl?.classList.toggle("blink", mode === EditMode.HOURS);
    this.minuteEl?.classList.toggle("blink", mode === EditMode.MINUTES);
  }

  onModeClick(cb: () => void): void {
    this.modeBtn?.addEventListener("click", cb);
  }

  onIncreaseClick(cb: () => void): void {
    this.increaseBtn?.addEventListener("click", cb);
  }

  onLightClick(cb: () => void): void {
    this.lightBtn?.addEventListener("click", cb);
  }
  onResetClick(cb: () => void): void {
    this.resetButton?.addEventListener("click", cb);
  }

  onFormatClick(cb: () => void): void {
    this.formatButton?.addEventListener("click", cb);
  }

  onRemoveClick(cb: () => void): void {
    this.removeButton?.addEventListener("click", cb)
  }

  toggleLightMode(): void {
    this.display.classList.toggle("light-mode");
  }
}