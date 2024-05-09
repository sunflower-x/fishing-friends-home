import { makeAutoObservable } from 'mobx';
import IndexBaseModel from '@/modelBase/index/modelBase'

class BaseModel {
    constructor() {
        makeAutoObservable(this);
    }
    indexBase = new IndexBaseModel()
}

export default  BaseModel