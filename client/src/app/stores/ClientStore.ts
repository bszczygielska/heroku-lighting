import LightBulb from '../models/LightBulb';
import { action, observable } from 'mobx';
import * as lodash from 'lodash';
import LightScene from '../models/LightScene';
import SceneLight from '../models/SceneLight'

export class ClientStore {
  public api: API;

  constructor() {
    this.api = new API();
  }

  @observable public lightBulbs: LightBulb[] = [];
  @observable public lightScenes: LightScene[] = [];
  @observable public forNewLight: string;
  @observable public forNewRoom: string;
  @observable public lightsToScene: SceneLight[] = [];
  @observable public sceneName: string;
  @observable public storedRoomName: string = '';

  public async fetchLights() {
    const response = await this.api.get('/lights');
    let sortedLightBulbs = response
      .map((light: any) => new LightBulb(light.name, light._id))
      .sort((a: LightBulb, b: LightBulb) => a.name.split('.').length - b.name.split('.').length);
    this.setValue('lightBulbs', sortedLightBulbs);
  }

  public async fetchScenes() {
    const response = await this.api.get('/lightScenes');
    if (!response.errCode) {
      this.setValue('lightScenes', response.map((scene: LightScene) => new LightScene(scene.name, scene.sceneLights, scene._id)));
    }
  }

  public async onNewLight(lightName: string) {
    let newName = this.combineNameForNewLight(lightName);
    let newLight = new LightBulb(newName);
    const response = await this.addLight(newLight);
    if (response.light) {
      this.addLightToStore(response);
    }
    this.setValue('forNewLight', null);
  }

  public async onNewRoomLight(roomName: string, lightName: string) {
    let newName = this.combineNameForNewRoom(roomName, lightName);
    let newLight = new LightBulb(newName);
    const response = await this.addLight(newLight);
    if (response.light) {
      this.addLightToStore(response)
    }
    this.setValue('forNewRoom', null);
  }

  public addLightToStore(response: any) {
    let createdLight = new LightBulb(response.light.name, response.light._id);
    let sortedLightBulbs = this.lightBulbs.concat(createdLight).sort((a, b) => a.name.split('.').length - b.name.split('.').length);
    this.setValue('lightBulbs', sortedLightBulbs);
  }

  combineNameForNewRoom(roomName: string, lightName: string) {
    return (this.forNewRoom === 'blank') ? `${roomName}.${lightName}` : `${this.forNewRoom}.${roomName}.${lightName}`
  }

  combineNameForNewLight(lightName: string) {
    if (this.forNewLight === 'blank') {
      return lightName;
    }
    return `${this.forNewLight}.${lightName}`
  }

  public setSceneToEdit(scene: LightScene) {
    this.setValue('lightsToScene', scene.sceneLights);
    this.setValue('sceneName', scene.name);
  }

  public onChooseLightToScene(light: LightBulb) {
    try {
      let sceneLight = new SceneLight(light.name, light._id);
      if (this.lightsToScene.indexOf(sceneLight) < 0) {
        this.setValue('lightsToScene', this.lightsToScene.concat(sceneLight))
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  public setLightColor(light: any, color: any) {
    light.hex = color.hex;
    light.hue = color.hsl.h;
    light.saturation = color.hsl.s;
    light.lightness = color.hsl.l;
  }

  public onDeleteLightToScene(light: SceneLight) {
    const filteredLights = this.lightsToScene.filter(l => l !== light);
    this.setValue('lightsToScene', filteredLights);
  }

  public async onDeleteLight(light: LightBulb) {
    const response = await this.deleteLight(light);
    if (!response.errCode) {
      this.setValue('lightBulbs', this.lightBulbs.filter(lights => lights !== light));
    }
    else {
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

  @action
  setValue(key: string, value: any) {
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
    if (!response.errCode) {
      this.setValue('lightScenes', this.lightScenes.concat(newScene));
      this.setValue('lightsToScene', []);
      this.setValue('sceneName', '');
    }
  }

  public async onDeleteScene(scene: LightScene) {
    const response = await this.api.deleteOne(`/lightScenes/${scene._id}`);
    if (!response.errCode) {
      this.setValue('lightScenes', this.lightScenes.filter(s => s !== scene));
    }
  }

  public async updateLightScene(sceneName: string, scene: LightScene){
    const updatedScene = new LightScene(sceneName, this.lightsToScene);
    let response = await this.api.put(`/lightScenes/${scene._id}`, updatedScene);
    if (!response.errCode) {
      scene.name = sceneName;
      this.setValue('lightsToScene', []);
      this.setValue('sceneName', '');
    }
  }

  public async toggleScene(scene: LightScene) {
    let stateToSet = !scene.state;
    console.log(stateToSet)
    let response = await this.api.put(`/lightScenes/${scene._id}`, { state: stateToSet} );
    if (!response.errCode) {
      scene.state = stateToSet;
    }
  }
}

export default ClientStore;

class API {
  private apiUrl: string = 'https://light-manager-client.herokuapp.com/api';
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