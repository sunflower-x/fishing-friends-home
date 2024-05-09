import { observable } from 'mobx';


const a = {
  counter: 0,

  increment() {
    this.counter++;
  },
  decrement() {
    this.counter--;
  },
  incrementAsync() {
    setTimeout(() => {
      this.counter++;
    }, 1000);
  }
};

const counterStore = observable(a);

export default counterStore;
