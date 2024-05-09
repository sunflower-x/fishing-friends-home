import { observable } from 'mobx'

const sdkStore = observable({
  jsSDK:null,
  type:'',

  setJsSDK({ type, payload }){
    this.jsSDK = payload
    this.type = type
  },
  updateSDK({ type, payload }){
    this.jsSDK = payload
    this.type = type
  },

})

export default sdkStore
