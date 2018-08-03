import { observable } from 'mobx';

export class SceneLight {

  constructor(name: string, id: string) {
    this.name = name;
    this._id = id;
  }

  @observable public name: string;
  @observable public _id: string;
  @observable public hue: string;
  @observable public saturation: string;
  @observable public lightness: string;
  @observable public hex: string;

  get displayableName() {
    let nameArr = this.name.split('.');
    return nameArr[nameArr.length - 1];
  }

}

export default SceneLight;