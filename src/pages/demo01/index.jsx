import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { observer, useLocalStore } from 'mobx-react'
import store from '../../store/counter'

// hooks写法

const App = observer((props) => {
    const  counterStore  = useLocalStore(() => store);

    const increment = () => {
        counterStore.increment()
    }

    const decrement = () => {
        counterStore.decrement()
    }

    const incrementAsync = () => {
        counterStore.incrementAsync()
    }

    return <>
        <View className='index'>
            <Button onClick={increment}>+</Button>
            <Button onClick={decrement}>-</Button>
            <Button onClick={incrementAsync}>Add Async</Button>
            <Text>{counterStore.counter}</Text>
        </View>
    </>
})

export default App
