import LightBulb from '../models/LightBulb';
import { action, observable } from 'mobx';
import * as _ from 'lodash';

export class ClientStore {
  public api: API;

  constructor() {
    this.api = new API();
  }

  @observable
  public lightBulbs: LightBulb[] = [
    new LightBulb('luzne'),
    new LightBulb('luzne2'),
    new LightBulb('kuchnia:okno'),
    new LightBulb('kuchnia:sciana'),
    new LightBulb('salon:pierwsze'),
    new LightBulb('salon:drugie'),
    new LightBulb('salon:trzecie'),
    new LightBulb('salon:tv:raz'),
    new LightBulb('salon:tv:dwa')];

  @observable
  public projectName: string = 'Mieszkanie';

  @observable
  public forNewLight: string;

  @observable
  public forNewRoom: string;

  @observable
  public lightsToScene: LightBulb[] = [];

  @observable
  public storedRoomName: string = '';

  public addLight(lightName: string) {
    this.setValue('lightBulbs', this.lightBulbs.concat(new LightBulb(lightName)));
    //try {
    //  this.api.post('/addLight', createdLight)
    //} catch (e) {
    //  console.log(e.message)
    //}
  }

  public onChooseLightToScene(light: LightBulb) {
    this.setValue('lightsToScene', this.lightsToScene.concat(light))
  }

  @action
  setValue(key: string, value: any) {
    this[key] = value;
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

  combineNameForNewRoom(roomName : string, lightName: string) {
    return (this.forNewRoom === 'blank') ? `${roomName}:${lightName}` : `${this.forNewRoom}:${roomName}:${lightName}`
  }

  combineNameForNewLight(lightName: string) {
    if (this.forNewLight === 'blank')
      return lightName;
    let nameArr = this.forNewLight.split(':');
    nameArr.splice(nameArr.length-1 , 1, lightName);
    return nameArr.join(':');
  }

  get lightsByGroup() {
    return _.groupBy(this.lightBulbs, 'name');
  }


  //public response : Object = [
  //  {
  //    name: 'osiedle',
  //    state: true,
  //    r: 255,
  //    g: 255,
  //    b: 255,
  //    s: 255,
  //    p: 255,
  //  },
  //  {
  //    name: 'osiedle:dom:salon',
  //    state: true,
  //    r: 255,
  //    g: 255,
  //    b: 255,
  //    s: 255,
  //    p: 255,
  //  },
  //  {
  //    name: 'osiedle:dom:kitchen:szafka',
  //    state: true,
  //    r: 255,
  //    g: 255,
  //    b: 255,
  //    s: 255,
  //    p: 255,
  //  },
  //  {
  //    _id: '',
  //    name: 'osiedle:dom:kitchen:szafka',
  //    state: true,
  //    r: 255,
  //    g: 255,
  //    b: 255,
  //    s: 255,
  //    p: 255,
  //  },
  //  {
  //    name: 'osiedle:dom:kitchen:szafka:2_polka',
  //    state: true,
  //    r: 255,
  //    g: 255,
  //    b: 255,
  //    s: 255,
  //    p: 255,
  //  }
  //]
  //
  //get sortedNamespaces() {
  //  return this.lightsByGroup.sort((a: any, b: any) => a.split(':').length - b.split(':').length);
  //}
  //
  //get lightsToView() {
  //  let schema = {};
  //  return this.sortedNamespaces.forEach((namespace: any) => {
  //
  //    let stepNamespace = [] as string[];
  //
  //    namespace.split(':').forEach(name => {
  //      stepNamespace.push(name);
  //      let objectPath = stepNamespace.join('.');
  //      let newNamespace = stepNamespace.join(':');
  //      let oldSchema = _.result(schema, objectPath, {});
  //      let newSchema = _.extend({
  //        namespace: newNamespace,
  //        isNested: true,
  //        lights: _.filter(this.response, (light: any) => light.name === newNamespace)
  //    }, oldSchema);
  //      return _.set(schema, objectPath, newSchema);
  //    })
  //  })
  //}

}

export default ClientStore;

class API {
  private apiUrl: string = 'http://localhost:5000';
  private headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
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