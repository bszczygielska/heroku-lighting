import LightBulb from '../models/LightBulb';
import { action, observable } from 'mobx';

export class ClientStore {
  public api: API;

  constructor() {
    this.api = new API();
  }

  @observable
  public lightBulbs: LightBulb[] = [];

  public addLight(lightName: string, roomName: string) {
    this.setValue('lightBulbs', this.lightBulbs.concat(new LightBulb(lightName, roomName)));
    //try {
    //  this.api.post('/addLight', createdLight)
    //} catch (e) {
    //  console.log(e.message)
    //}
  }

  @action
  setValue(key: string, value: any) {
    this[key] = value;
  }

  public async fetchLights() {
    await this.api.get('/lights')
      .then((lights) => this.lightBulbs = lights)
  }

}

export default ClientStore;

class API {
  private apiUrl: string = 'localhost:5000';
  private headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  public get(path: string) {
    path = `${this.apiUrl}${path}`;
    const options = {
      method: 'GET',
      headers: this.headers,
    };
    return fetch(path, options as RequestInit).then(data => data.json());
  }

  public async post(path: any, data: any) {
    path = `${this.apiUrl}${path}`;
    const options = {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    };
    return fetch(path, options as RequestInit).then(data => data.json());
  }
}