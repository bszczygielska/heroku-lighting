import {observable} from "mobx";

export class LightBulb {

  constructor(name, group) {
    this.name = name;
    this.group = group;
  }

  @observable public name: string;
  @observable public group: string;
  @observable public state: boolean;
  @observable public r: number;
  @observable public g: number;
  @observable public b: number;
  @observable public s: number;
  @observable public p: number;

}

export default LightBulb;