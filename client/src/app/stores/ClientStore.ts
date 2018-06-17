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
  public projectName: string = 'Mieszkanie';

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
    let lights = this.lightBulbs;
    lights.map( light => {
      let name = light.name.replace(':', '.');
      lodash.set(result, name, light);
    });
    return result;
  }

  public addLight(lightName: string) {
    const createdLight = new LightBulb(lightName);
    this.setValue('lightBulbs', this.lightBulbs.concat(createdLight));
    try {
      this.api.post('/addLight', createdLight)
    } catch (e) {
      console.log(e.message)
    }
  }

  public addLightScene(sceneName: string) {
    const createdScene = new LightScene(sceneName, this.lightsToScene);
    this.setValue('lightScenes', this.lightScenes.concat(createdScene));
    try {
      this.api.post('/addLightScene', createdScene)
    } catch (e) {
      console.log(e.message)
    }
  }

  public onChooseLightToScene(light: LightBulb) {
    if (this.lightsToScene.indexOf(light) < 0) {
      this.setValue('lightsToScene', this.lightsToScene.concat(light))
    }
  }

  public onDeleteLightToScene(light: LightBulb) {
    const filteredLights = this.lightsToScene.filter(l => l !== light );
    this.setValue('lightsToScene', filteredLights);
  }

  public async fetchLights() {
    await this.api.get('/lights')
      .then((lights) => this.lightBulbs = lights)
  }

  public addLightInNewRoom(roomName: string, lightName: string) {
    let newName = this.combineNameForNewRoom(roomName, lightName)
    this.addLight(newName);
    this.setValue('forNewRoom', null)
  }

  public addLightInCurrentRoom(lightName: string) {
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