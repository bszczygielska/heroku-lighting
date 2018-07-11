import { observable } from 'mobx';
import SceneLight from "./SceneLight";

export class LightScene {

  constructor(name: string, sceneLights: SceneLight[], _id?: string) {
    this.name = name;
    this.sceneLights = sceneLights;
    if(_id) {
      this._id = _id
    }
  }

  @observable public name: string;
  @observable public sceneLights: SceneLight[];
  @observable public _id: string;

}

export default LightScene;