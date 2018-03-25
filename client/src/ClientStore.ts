import LightBulb from "./models/LightBulb";

export class ClientStore {

    public lightBulbs: LightBulb[] = [];

    public addLight(lightName, roomName) {
      this.lightBulbs.push(new LightBulb(lightName, roomName));
    }

    public fetchLights() {

    }

    public editLight() {

    }

};

export default ClientStore;