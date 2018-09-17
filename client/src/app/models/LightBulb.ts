import { observable } from 'mobx';

export class LightBulb {

  constructor(name: string, id?: string) {
    this.name = name;
    if (id)
      this._id = id;
  }

  //test
  @observable public name: string;
  @observable public _id: string;

  get displayableName() {
    let nameArr = this.name.split('.');
    return nameArr[nameArr.length - 1];
  }

}

export default LightBulb;