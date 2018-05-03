import {observable} from "mobx";

export class LightBulb {

  constructor(name: any, group: any) {
    this.group = `${group}:${name}`;
  }

  @observable public group: string;
  @observable public state: boolean;
  @observable public r: number;
  @observable public g: number;
  @observable public b: number;
  @observable public s: number;
  @observable public p: number;

}

export default LightBulb;