/*
 * @Author: your name
 * @Date: 2020-10-26 08:40:16
 * @LastEditTime: 2020-10-27 10:17:27
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
        // 缓存中没有卡号
        window.location.href = `http://127.0.0.1:5500/`;
    }
}

function getCardNumFromLocalStorage() {
    return window.localStorage.getItem("id");
}