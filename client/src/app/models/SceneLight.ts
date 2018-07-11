import { observable } from 'mobx';

export class SceneLight {

  constructor(name: string, id: string) {
    this.name = name;
    this._id = id;
  }

  @observable public name: string;
  @observable public _id: string;
  @observable public r: string;
  @observable public g: string;
  @observable public b: string;
  @observable public s: string;
  @observable public p: string;

  get displayableName() {
    let nameArr = this.name.split('.');
    return nameArr[nameArr.length - 1];
  }

}

export default SceneLight;