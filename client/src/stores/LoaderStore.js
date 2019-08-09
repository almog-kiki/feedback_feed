import { observable } from "mobx";

class LoaderStore {

    @observable isLoaderToFront  = false;

    constructor(RootStore){
        this.RootStore = RootStore;
    }
}

export default LoaderStore;
