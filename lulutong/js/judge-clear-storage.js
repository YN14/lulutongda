/*
 * @Author: your name
 * @Date: 2020-10-26 08:40:16
 * @LastEditTime: 2020-10-29 09:55:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lulutong\js\judge-clear-storage.js
 */

//  var cardNum;

function clearStorage(){
    window.localStorage.clear();
}

function judgeStorage(){
    if (window.localStorage.getItem("id")) {
        // 从缓存获取卡号
        let cardNum = getCardNumFromLocalStorage();
        return cardNum;
    } else {
        alert("非法发访问！");
        // 缓存中没有卡号
        window.location.href = `/index.html`;
    }
}

function judgeStorageSource(){
    if (window.localStorage.getItem("source")) {
        // 从缓存获取源
        let sourceStr = getSourceFromLocalStorage();
        return sourceStr;
    } else {
        alert("非法发访问！");
        // 缓存中没有源
        window.location.href = `/index.html`;
    }
}

function getCardNumFromLocalStorage() {
    return window.localStorage.getItem("id");
}

function getSourceFromLocalStorage(){
    return window.localStorage.getItem("source");
}