import LightBulb from '../models/LightBulb';
import { action, observable } from 'mobx';
import * as lodash from 'lodash';
import LightScene from '../models/LightScene';

export class ClientStore {
  public api: API;

  constructor() {
    this.api = new API();
  }

  @observable public lightBulbs: LightBulb[] = [];
  @observable public lightScenes: LightScene[] = [];
  @observable public projectName: string = '';
  @observable public forNewLight: string;
  @observable public forNewRoom: string;
  @observable public lightsToScene: LightBulb[] = [];
  @observable public sceneName: string;
  @observable public storedRoomName: string = '';

  public async fetchLights() {
    const response = await this.api.get('/lights');
    let sortedLightBulbs = response
      .map((light: any) => new LightBulb(light.name))
      .sort((a: LightBulb, b: LightBulb) => a.name.split('.').length - b.name.split('.').length);
    this.setValue('lightBulbs', sortedLightBulbs);
  }

  public async onNewLight(lightName: string) {
    let newName = this.combineNameForNewLight(lightName);
    let newLight = new LightBulb(newName)
    const response = await this.addLight(newLight);
    if (response.light) {
      let createdLight = new LightBulb(response.light.name, response.light._id);
      this.setValue('lightBulbs', this.lightBulbs.concat(createdLight)
        .sort((a, b) => a.name.split('.').length - b.name.split('.').length));
    }
    this.setValue('forNewLight', null)
  }

  public onNewRoomLight(roomName: string, lightName: string) {
    let newName = this.combineNameForNewRoom(roomName, lightName);
    let newLight = new LightBulb(newName);
    this.addLight(newLight);
    this.setValue('forNewRoom', null);
  }

  combineNameForNewRoom(roomName: string, lightName: string) {
    return (this.forNewRoom === 'blank') ? `${roomName}.${lightName}` : `${this.forNewRoom}.${roomName}.${lightName}`
  }

  combineNameForNewLight(lightName: string) {
    if (this.forNewLight === 'blank') {
      return lightName;
    }
    let nameArr = this.forNewLight.split('.');
    nameArr.splice(nameArr.length - 1, 1, lightName);
    return nameArr.join('.');
  }

  public onChooseLightToScene(light: LightBulb) {
    if (this.lightsToScene.indexOf(light) < 0) {
      this.setValue('lightsToScene', this.lightsToScene.concat(light))
    }
  }

  public onDeleteLightToScene(light: LightBulb) {
    const filteredLights = this.lightsToScene.filter(l => l !== light);
    this.setValue('lightsToScene', filteredLights);
  }

  public async onDeleteLight(light: LightBulb) {
    const response = await this.deleteLight(light);
    if (!response.errCode) {
      this.setValue('lightBulbs', this.lightBulbs.filter(lights => lights !== light));
    } else {
      console.log(response)
    }
  }

  get coolObjectForRendering() {
    let result = {};
    this.lightBulbs.map(light => {
      lodash.set(result, light.name, light);
    });
    return result;
  }

  @action setValue(key: string, value: any) {
    this[key] = value;
  }

  public addLight(light: LightBulb) {
    return this.api.post('/lights', light);
  }

  public deleteLight(light: LightBulb) {
    return this.api.deleteOne(`/lights/${light._id}`);
  }

  public async addLightScene(sceneName: string) {
    const newScene = new LightScene(sceneName, this.lightsToScene);
    let response = await this.api.post('/lightScenes', newScene);
    if (response.scene) {
      let createdScene = new LightScene(response.scene.name, response.scene.lights);
      this.setValue('lightScenes', this.lightScenes.concat(createdScene));
    }
  }
}

export default ClientStore;

class API {
  private apiUrl: string = 'http://localhost:5000';
  private headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  public async get(path: string) {
    path = `${this.apiUrl}${path}`;
    const options = {
      method: 'GET',
      headers: this.headers,
    };
    return await fetch(path, options as RequestInit).then(data => data.json());
  }

  public async post(path: any, data: any) {
    path = `${this.apiUrl}${path}`;
    const options = {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    };
    return await fetch(path, options as RequestInit).then(data => data.json());
  }

  public async put(path: any, data: any) {
    path = `${this.apiUrl}${path}`;
    const options = {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(data),
    };
    return await fetch(path, options as RequestInit).then(data => data.json());
  }

  public async deleteOne(path: any, data?: any) {
    path = `${this.apiUrl}${path}`;
    const options = {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify(data),
    };
    return await fetch(path, options as RequestInit).then(data => data.json());
  }


}