import { appState } from "../AppState.js"
import { Job } from "../Models/Job.js"
import { jobsService } from "../Services/JobsServices.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML } from "../Utils/Writer.js"

function _drawJobs() {
    let template = ''
    const jobs = appState.jobs
    jobs.forEach(j => template += j.ListTemplate)

    setHTML('listings', template)
}

function _drawJobForm() {
    let job = appState.activeJob
    setHTML('listing-form', Job.GetJobFormTemplate())
}

export class JobsController {
    constructor() {
        console.log("jobs controller on")
        appState.on('activeJob', _drawJobForm)
        appState.on("jobs", _drawJobs)
        _drawJobForm()
    }

    async createJob() {
        window.event.preventDefault()
        try {
            window.event.preventDefault()
            let form = window.event.target
            let jobData = getFormData(form)
            console.log(jobData)
            await jobsService.createJob(jobData)
            form.reset()
        } catch (error) {
            Pop.error(error.message)
            console.error(error)
        }
    }

    setActive(id) {
        jobsService.setActive(id)
    }


    async editJob(id) {
        try {
            window.event.preventDefault()
            const form = window.event.target
            const jobData = getFormData(form)
            await jobsService.editJob(jobData, id)
            form.reset()
        } catch (error) {
            console.error(error)
        }
    }

    async getJobs() {
        try {
            await jobsService.getJobs()
            // jobs form
        } catch (error) {
            Pop.error(error.message)
            console.error(error)
        }
    }

}

