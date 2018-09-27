import { observable } from 'mobx';
import SceneLight from "./SceneLight";

export class LightScene {

  constructor(name: string, sceneLights: SceneLight[], _id?: string, state: boolean = false) {
    this.name = name;
    this.sceneLights = sceneLights;
    if(_id) {
      this._id = _id;
      this.state = state;
    }
  }

  @observable public name: string;
  @observable public sceneLights: SceneLight[];
  @observable public _id: string;
  @observable public state: boolean;

}

export default LightScene;