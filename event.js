/*
 * @Author: your name
 * @Date: 2020-01-07 10:37:41
 * @LastEditTime : 2020-01-07 11:28:31
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ZfjdWebBasicPlugin\src\commons\event.js
 */
 let eventUtils = {
    eventMessageMap:new Map(),
    //订阅消息
    subscribeMessage:function(eventName,cb){
        let {eventMessageMap} = this;
        let callBackList = eventMessageMap.get(eventName)?eventMessageMap.get(eventName):[];
        callBackList.push(cb);
        eventMessageMap.set(eventName,callBackList);
    },
    //发布消息
    publishMessage:function(eventName,...arg){
        let {eventMessageMap} = this;
        let callBackList = eventMessageMap.get(eventName)?eventMessageMap.get(eventName):[];
        callBackList.forEach(cb => {
            cb?cb(...arg):"";
        });
    },
    //混合入目标对象
    mixins:function(target){
        if(!target){
            return null;
        }

        for(let key in this){
            target[key] = this[key]
        }

        return target;
    }
}


export default eventUtils;