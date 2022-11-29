export class Home {
    constructor(data) {
        this.bedrooms = data.bedrooms || 0
        this.bathrooms = data.bathrooms || 0
        this.levels = data.levels || 0
        this.year = data.year || 0
        this.imgUrl = data.imgUrl || ''
        this.price = data.price || 0
        this.description = data.description || 'coming soon'
        this.createdAt = new Date(data.createdAt)
        this.id = data.id || ''
    }

    get ListTemplate() {
        return `<div class="col-4 p-4">
        <div class="card">
    <img src="${this.imgUrl}" class="card-img-top img-home" alt="${this.levels} floor home">
    <div class="card-body">
        <h5 class="card-title d-flex justify-content-between mb-2">
            <span>${this.bedrooms} Bedrooms, ${this.bathrooms} Bathrooms</span>
            <span>$${this.price}</span>
        </h5>
        <button class="btn btn-primary"  onclick="app.homesController.setActive('${this.id}')">
            See Details
        </button>
        <button class="btn btn-info"><i class="mdi mdi-pencil" onclick="app.homesController.setActive('${this.id}')"></i></button>
    </div>
</div>
</div>
`}

    static GetHomeFormTemplate(home) {
        if (!home) {
            home = new Home({})
        }
        return `
<form onsubmit="app.homesController.${home.id ? `editHome('${home.id}')` : 'createHome()'}">
  <div class="form-floating mb-3">
    <input required type="number" class="form-control" id="home-beds" placeholder="Home Beds"
      name="bedrooms" value="${home.bedrooms}">
    <label for="home-beds">Number of Bedrooms</label>
  </div>
  <div class="form-floating mb-3">
    <input required type="number" class="form-control" id="home-bathrooms" placeholder="Home Baths"
      name="bathrooms" value="${home.bathrooms}">
    <label for="home-beds">Number of Bathrooms</label>
  </div>
  <div class="form-floating mb-3">
    <input required type="number" class="form-control" id="home-levels" placeholder="Square Feet" name="levels" value="${home.levels}">
    <label for="home-levels" >Floors</label>
  </div>
  <div class="form-floating mb-3">
    <input required type="number" class="form-control" id="home-price" placeholder="Home Price" name="price" value="${home.price}">
    <label for="home-price">Price</label>
  </div>
  <div class="form-floating mb-3">
    <input required type="number" class="form-control" id="home-year" placeholder="Year Built" name="year" value="${home.year}">
    <label for="year-built">Year</label>
  </div>
  <div class="form-floating mb-3">
    <input required type="text" class="form-control" id="home-description" placeholder="Home Description" name="description" value="${home.description}">
    <label for="home-description">Description</label>
  </div>
  <div class="form-floating mb-3">
    <input required type="url" class="form-control" id="home-img" placeholder="Home Image" name="imgUrl" value="${home.imgUrl}">
    <label for="home-img">Image</label>
  </div>
  <button type="submit" class="btn btn-success mt-3">Submit</button>
  <button type="reset" class="btn btn-outline-danger mt-3">Reset</button>
</form>
`
    }
}  
