import { observable } from 'mobx';
import SceneLight from "./SceneLight";

export class LightScene {

  constructor(name: string, sceneLights: SceneLight[]) {
    this.name = name;
    this.sceneLights = sceneLights;
  }

  @observable public name: string;
  @observable public sceneLights: SceneLight[];

}

export default LightScene;