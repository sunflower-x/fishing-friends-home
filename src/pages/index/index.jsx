import { Component,useEffect } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import BaseModel from './model';

const baseModel = new BaseModel();
const {indexBase} =baseModel
const App = () => {
    useEffect(() => {
        console.log(baseModel,'baseModel');
    })
    return <>
        <View>首页</View>
        <Button onClick={() => { indexBase.getUserInfo() }}>发送请求</Button>
    </>
}

export default App