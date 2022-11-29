import { appState } from "../AppState.js"
import { carsService } from "../Services/CarsService.js"
import { homesService } from "../Services/HomesService.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML } from "../Utils/Writer.js"
import { Home } from "../Models/Home.js"
import { getFormData } from "../Utils/FormHandler.js";

function _drawHomes() {
    const homes = appState.homes
    let template = ''
    homes.forEach(h => template += h.ListTemplate)
    setHTML('listings', template)
}

function _drawHomeForm() {
    let home = appState.activeHome
    setHTML('listing-form', Home.GetHomeFormTemplate(home))
}

export class HomesController {
    constructor() {
        appState.on('homes', _drawHomes)
        appState.on('activeHome', _drawHomeForm)
    }

    async getHomes() {
        try {
            await homesService.getHomes()
            _drawHomeForm()
        } catch (error) {
            Pop.error(error.message)
            console.error(error)
        }
    }

    setActive(id) {
        homesService.setActive(id)
    }

    async editHome(id) {
        try {
            window.event.preventDefault()
            const form = window.event.target
            const homeData = getFormData(form)
            await homesService.editHome(homeData, id)
            form.reset()
        }
        catch (error) {
            console.error(error)
        }
    }


    async createHome() {
        try {
            window.event.preventDefault()
            let form = window.event.target
            let homeData = getFormData(form)
            console.log(homeData)
            form.reset()
            await homesService.createHome(homeData)
        } catch (error) {
            Pop.error(error.message)
            console.error(error)
        }
    }
}
