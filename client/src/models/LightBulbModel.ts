export class LightBulbModel {

  public label: string;
  public group: string;
  readonly id: number;

  constructor(label: string, group?: string) {
    this.id = LightBulbModel.generateId();
    this.label = label;
    this.group = group;
  };

  static nextId = 1;
  static generateId() {
    return this.nextId++;
  }
}

export default LightBulbModel;