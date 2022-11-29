import { appState } from "../AppState.js"
import { Home } from "../Models/Home.js"
import { Job } from "../Models/Job.js"
import { getFormData } from "../Utils/FormHandler.js"
import { setHTML } from "../Utils/Writer.js"



class JobsService {
    async getJobs() {
        const res = await axios.get('http://localhost:3000/api/jobs')
        console.log(res.data)
        appState.jobs = res.data.map(j => new Job(j))
        console.log(appState.jobs)
    }


    async editJob(jobData, id) {
        const res = await axios.put("http://localhost:3000/api/jobs" + id, jobData)
        let index = appState.jobs.findIndex(h => h.id == id)
        appState.jobs.splice(index, 1, new Job(res.data))
        appState.emit('jobs')
    }

    setActive(id) {
        let foundjob = appState.jobs.find(j => j.id == id)
        console.log(appState.jobs)
        console.log(foundjob)
        appState.activeJob = foundjob
        console.log(appState.activeJob)
    }

    async createJob(jobData) {
        window.event.preventDefault()
        const res = await axios.post('http://localhost:3000/api/jobs', jobData)
        console.log(res.data)
        appState.jobs = [...appState.jobs, new Job(res.data)]
    }
}


export const jobsService = new JobsService()