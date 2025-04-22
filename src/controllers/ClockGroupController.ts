import { ClockModel } from '../models/ClockModel';
import { AnalogClockView } from '../views/AnalogClockView';
import { ClockView } from '../views/ClockView';
import { AnalogClockController } from './AnalogClockController';
import { ClockController } from './ClockController';


export class ClockGroupController {
    private container = document.getElementById('clocksContainer')
    private addBtn = document.getElementById('addNewClockBtn') as HTMLButtonElement
    private timezoneSelect = document.getElementById('timezoneSelect') as HTMLSelectElement
    private clockTypeSelect = document.getElementById('clockTypeSelect') as HTMLSelectElement
    private clockModels: ClockModel[] = []

    constructor() {
        this.addBtn.addEventListener('click', () => {
            const offset = parseInt(this.timezoneSelect.value, 10)
            this.addClock(offset)
        })

        this.addClock(0)
        setInterval(() => {
            this.clockModels.forEach(m => m.tick())
        }, 1000)
    }

    addClock(offset: number) {
        const el = document.createElement('div')
        el.className = 'watch'
        this.container.appendChild(el)

        const model = new ClockModel(offset)
        /*  const view = new ClockView(el)
          const controller = new ClockController(model, view, () => {
              el.remove()
              this.clockModels = this.clockModels.filter(m => m !== model)
          })
  
          view.renderTime(model.getTime().hours, model.getTime().minutes, model.getTime().seconds, model.getFormat())
  
          this.clockModels.push(model)
          this.controllers.push(controller)*/

        let controller;
        let view;
        const typeSelected = this.clockTypeSelect.value
        if (typeSelected === 'digital') {
            view = new ClockView(el)
            controller = new ClockController(model, view, () => {
                el.remove()
                this.clockModels = this.clockModels.filter(m => m !== model)
            })
        }
        else {
            view = new AnalogClockView(el)
            controller = new AnalogClockController(model, view, () => {
                el.remove()
                this.clockModels = this.clockModels.filter(m => m !== model)
            })
        }

        view.renderTime(model.getTime().hours, model.getTime().minutes, model.getTime().seconds, model.getFormat())
        this.clockModels.push(model)
    }
}