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

  public static defaults() {
    return {
      state: false,
      r: 0,
      g: 0,
      b: 0,
      s: 0,
      p: 0,
    };
  }

}

export default LightBulb;