import LightBulb from '../models/LightBulb';
import { action, observable } from 'mobx';
import * as lodash from 'lodash';
import LightScene from '../models/LightScene';

export class ClientStore {
  public api: API;

  constructor() {
    this.api = new API();
  }

  @observable
  public lightBulbs: LightBulb[] = [];

  @observable
  public lightScenes: LightScene[] = [];

  @observable
  public projectName: string = '';

  @observable
  public forNewLight: string;

  @observable
  public forNewRoom: string;

  @observable
  public lightsToScene: LightBulb[] = [];

  @observable
  public sceneName: string;

  @observable
  public storedRoomName: string = '';

  get coolObjectForRendering() {
    let result = {};
    this.lightBulbs.map(light => {
      let name = light.name.replace(':', '.');
      lodash.set(result, name, light);
    });
    return result;
  }

  public async addLight(lightName: string) {
    const createdLight = new LightBulb(lightName);
    const response = await this.api.post('/addLight', createdLight);
    if (response)
      this.setValue('lightBulbs', this.lightBulbs.concat(createdLight));

  }

  public async addLightScene(sceneName: string) {
    const createdScene = new LightScene(sceneName, this.lightsToScene);
    let response = await this.api.post('/addLightScene', createdScene);
    if (response)
      this.setValue('lightScenes', this.lightScenes.concat(createdScene));
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

  public onDeleteLight(light: LightBulb) {
    const filteredLights = this.lightBulbs.filter(l => l !== light);
    this.setValue('lightBulbs', filteredLights);
  }

  public async fetchLights() {
    const response = await this.api.get('/lights');
    this.lightBulbs = response;
  }

  public onNewRoomLight(roomName: string, lightName: string) {
    let newName = this.combineNameForNewRoom(roomName, lightName);
    this.addLight(newName);
    this.setValue('forNewRoom', null);
  }

  public onNewLight(lightName: string) {
    let newName = this.combineNameForNewLight(lightName);
    this.addLight(newName);
    this.setValue('forNewLight', null)
  }

  combineNameForNewRoom(roomName: string, lightName: string) {
    return (this.forNewRoom === 'blank') ? `${roomName}:${lightName}` : `${this.forNewRoom}:${roomName}:${lightName}`
  }

  combineNameForNewLight(lightName: string) {
    if (this.forNewLight === 'blank') {
      return lightName;
    }
    let nameArr = this.forNewLight.split(':');
    nameArr.splice(nameArr.length - 1, 1, lightName);
    return nameArr.join(':');
  }

  @action
  setValue(key: string, value: any) {
    this[key] = value;
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
}