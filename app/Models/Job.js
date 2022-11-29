export class Job {
    constructor(data) {
        this.jobTitle = data.jobTitle || ""
        this.company = data.company || ""
        this.hours = data.hours || 0
        this.rate = data.rate || 0
        this.description = data.description || ""
        this.createdAt = new Date(data.createdAt)
        this.id = data.id || ""
    }

    async createJob() {
        try {
            window.event.preventDefault()
            const form = window.event.target
        } catch (error) {
            console.log(error)
        }
    }


    get ListTemplate() {
        return `<div class="col-4 p-4">
        <div class="card">
    <div class="card-body">
        <h5 class="card-title d-flex justify-content-between mb-2">
            <h2 class="text-center">${this.jobTitle}</h2>
            <h3 class="text-center">${this.company}</h3>
            <p class="text-center">${this.description}</p>
            <h4> Rate: $${this.rate} Hours: ${this.hours}</h4>
        </h5>
        <button class="btn btn-primary"  onclick="app.jobsController.setActive('${this.id}')">
            See Details
        </button>
        <button class="btn btn-info"><i class="mdi mdi-pencil" onclick="app.jobsController.setActive('${this.id}')"></i></button>
    </div>
</div>
</div>
`
    }


    static GetJobFormTemplate(job) {
        if (!job) {
            job = new Job({})
        }
        return `
<form onsubmit="app.jobsController.${job.id ? `editJob('${job.id}')` : 'createJob()'}">
  <div class="form-floating mb-3">
    <input required type="text" class="form-control" id="title" placeholder="Job Title"
      name="jobTitle" value="${job.jobTitle}">
    <label for="beds">Job title</label>
  </div>
  <div class="form-floating mb-3">
    <input required type="text" class="form-control" id="company" placeholder="Company Name"
      name="company" value="${job.company}">
    <label for="beds">Name of Company</label>
  </div>
  <div class="form-floating mb-3">
  <input required type="text" class="form-control" id="description" placeholder="Description" name="description" value="${job.description}">
  <label for="description">Brief Description</label>
</div>
  <div class="form-floating mb-3">
    <input required type="number" class="form-control" id="rate" placeholder="Job Rate" name="rate" value="${job.rate}">
    <label for="rate">Rate</label>
  </div>
  <div class="form-floating mb-3">
    <input required type="number" class="form-control" id="hours" placeholder="Available Hours" name="hours" value="${job.hours}">
    <label for="Hours">Hours Available</label>
  </div>
  <button type="submit" class="btn btn-success mt-3">Submit</button>
  <button type="reset" class="btn btn-outline-danger mt-3">Reset</button>
</form>
`
    }
}