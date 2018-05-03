import LightBulb from '../models/LightBulb';
import { action, observable } from 'mobx';

export class ClientStore {
  public api: API;

  constructor() {
    this.api = new API();
  }

  @observable
  public lightBulbs: LightBulb[] = [];

  @observable
  public showNewLightModal: boolean = false;

  @observable
  public showNewRoomSpaceModal: boolean = false;

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

  //get lightsByGroup() {
  //  return _.groupBy(this.lightBulbs, 'group');
  //}
  //
  //get sortedNamespaces() {
  //  this.lightsByGroup.sort((a, b) => a.split(':').length - b.split(':').length);
  //}
  //
  //get lightsToView() {
  //  let schema = {};
  //  this.sortedNamespaces.forEach((namespace) => {
  //    let stepNamespace = [];
  //
  //    namespace.split(':').forEach(group => {
  //      stepNamespace.push(group);
  //      let objectPath = stepNamespace.join('.');
  //      let newNamespace = stepNamespace.join(':');
  //      let oldSchema = _.result(schema, objectPath, {});
  //      let newSchema = _.extend({
  //        namespace: newNamespace,
  //        isNested:
  //        lights: _.filter(response, (light) => light.group === newNamespace)
  //    }, oldSchema)
  //
  //      return _.set(schema, objectPath, newSchema);
  //    })
  //  })
  //}


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