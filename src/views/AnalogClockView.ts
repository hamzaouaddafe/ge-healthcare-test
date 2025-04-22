
export class AnalogClockView {
    private container: HTMLElement
    private svg: SVGSVGElement
    private hourHand: SVGLineElement
    private minHand: SVGLineElement
    private secHand: SVGLineElement
    private removeBtn: HTMLButtonElement

    constructor(container: HTMLElement) {
        this.container = container

        this.container.innerHTML = `
        <svg viewBox="0 0 100 100" class="analog-clock">
            <circle cx="50" cy="50" r="48" fill="#fff" stroke="#000" stroke-width="1"/>
            <line id="h" x1="50" y1="50" x2="50" y2="30" stroke="#000" stroke-width="3"/>
            <line id="m" x1="50" y1="50" x2="50" y2="20" stroke="#000" stroke-width="2"/>
            <line id="s" x1="50" y1="50" x2="50" y2="15" stroke="#f00" stroke-width="1"/>
        </svg>
        <button class="remove" >Remove</button>
        `

        this.svg = container.querySelector(".analog-clock")
        this.hourHand = this.svg.querySelector("#h")
        this.minHand = this.svg.querySelector("#m")
        this.secHand = this.svg.querySelector("#s")
        this.removeBtn = container.querySelector(".remove")
    }
    renderTime(h: number, m: number, s: number) {
        // Calculate angles in degrees
        const degH = ((h % 12) / 12) * 360 + (m / 60) * 30;
        const degM = (m / 60) * 360;
        const degS = (s / 60) * 360;

        this.hourHand.setAttribute("transform", `rotate(${degH},50,50)`);
        this.minHand.setAttribute("transform", `rotate(${degM},50,50)`);
        this.secHand.setAttribute("transform", `rotate(${degS},50,50)`);
    }


    onRemoveClick(cb: () => void) {
        this.removeBtn.addEventListener('click', cb)
    }
}