import { observable } from 'mobx';

export class LightBulb {

  constructor(name: string) {
    this.name = name;
  }

  @observable public name: string;
  @observable public state: boolean;
  @observable public r: number;
  @observable public g: number;
  @observable public b: number;
  @observable public s: number;
  @observable public p: number;

  get displayableName() {
    let nameArr = this.name.split('.');
    return nameArr[nameArr.length-1];
  }

}

export default LightBulb;