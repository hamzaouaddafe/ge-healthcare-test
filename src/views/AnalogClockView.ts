import { multiply, rotation, translation } from "../utils/MatrixUtils";

export class AnalogClockView {
    private container: HTMLElement
    private hourHand: SVGLineElement
    private minHand: SVGLineElement
    private secHand: SVGLineElement
    private removeBtn: HTMLButtonElement
  
    constructor(container: HTMLElement) {
      this.container = container
  
      this.container.innerHTML = `
        <svg viewBox="0 0 100 100" id="analog-clock">
          <circle cx="50" cy="50" r="48" fill="#fff" stroke="#000" stroke-width="1"/>
          <line id="h" x1="0" y1="0" x2="0" y2="-15" stroke="#000" stroke-width="3"/>
          <line id="m" x1="0" y1="0" x2="0" y2="-25" stroke="#000" stroke-width="2"/>
          <line id="s" x1="0" y1="0" x2="0" y2="-30" stroke="#f00" stroke-width="1"/>
        </svg>
        <button class="remove">Remove</button>
      `
  
      this.hourHand = this.container.querySelector("#h")!
      this.minHand = this.container.querySelector("#m")!
      this.secHand = this.container.querySelector("#s")!
      this.removeBtn = this.container.querySelector(".remove")!
    }
  
    renderTime(h: number, m: number, s: number) {
      const hourAngle = ((h % 12) / 12 + m / 720) * 2 * Math.PI;
      const minuteAngle = (m / 60) * 2 * Math.PI;
      const secondAngle = (s / 60) * 2 * Math.PI;
  
      const origin = translation(50, 50);
  
      const hourMatrix = multiply(origin, rotation(hourAngle));
      const minuteMatrix = multiply(origin, rotation(minuteAngle));
      const secondMatrix = multiply(origin, rotation(secondAngle));
  
      const toSVGMatrix = (m: number[][]) => 
        `matrix(${m[0][0]} ${m[1][0]} ${m[0][1]} ${m[1][1]} ${m[0][2]} ${m[1][2]})`;
  
      this.hourHand.setAttribute("transform", toSVGMatrix(hourMatrix));
      this.minHand.setAttribute("transform", toSVGMatrix(minuteMatrix));
      this.secHand.setAttribute("transform", toSVGMatrix(secondMatrix));
    }
  
    onRemoveClick(cb: () => void) {
      this.removeBtn.addEventListener("click", cb);
    }
}