import { observable } from 'mobx';
import LightBulb from "./LightBulb";

export class LightScene {

  constructor(name: string, bulbs: LightBulb[]) {
    this.name = name;
    this.lightBulbs = bulbs;
  }

  @observable public name: string;
  @observable public lightBulbs: LightBulb[];

}

export default LightScene;