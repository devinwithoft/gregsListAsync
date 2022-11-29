import { appState } from "../AppState.js"
import { Home } from "../Models/Home.js"

class HomesService {
    async getHomes() {
        const res = await axios.get('http://localhost:3000/api/homes')
        console.log('homes,', res.data)
        appState.homes = res.data.map(h => new Home(h))
        console.log(appState.homes)
    }


    async editHome(homeData, id) {
        const res = await axios.put("http://localhost:3000/api/homes/" + id, homeData)
        console.log(res.data)
        let index = appState.homes.findIndex(h => h.id == id)
        appState.homes.splice(index, 1, new Home(res.data))
        appState.emit('homes')
    }

    setActive(id) {
        let home = appState.homes.find(h => h.id == id)
        appState.activeHome = home
        console.log(appState.activeHome)
    }
    async createHome(homeData) {
        const res = await axios.post('http://localhost:3000/api/homes', homeData)
        console.log('NEW HOME', res.data)
        appState.homes = [...appState.homes, new Home(res.data)]
    }

}



export const homesService = new HomesService()