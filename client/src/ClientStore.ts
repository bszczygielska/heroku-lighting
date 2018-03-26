import LightBulb from "./models/LightBulb";

export class ClientStore {
  public api: API;
  public lightBulbs: LightBulb[] = [];

  public addLight(lightName: string, roomName: string) {
    let createdLight = new LightBulb(lightName, roomName);
    this.lightBulbs.push(createdLight);
    try {
      this.api.post('/addLight', createdLight)
    } catch (e) {
      console.log(e.message)
    }
  }

  public fetchLights() {
    this.api.get('/lights')
      .then((lights) => this.lightBulbs = lights)
  }

}
export default ClientStore;



class API {
  private apiUrl: string = 'localhost:5000';
  private headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  public get(path) {
    path = `${this.apiUrl}${path}`;
    const options = {
      method: 'GET',
      headers: this.headers
    };
    return fetch(path, options).then(data => data.json());
  }

  public post(path, data) {
    path = `${this.apiUrl}${path}`;
    const options = {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data)
    };
    return fetch(path, options).then(data => data.json());
  }
}
