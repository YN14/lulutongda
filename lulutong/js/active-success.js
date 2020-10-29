/*
 * @Author: your name
 * @Date: 2020-10-27 18:47:23
 * @LastEditTime: 2020-10-29 09:58:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lulutong\js\active-success.js
 */

var cardNum = judgeStorage();
// 检测源-fillMsg
var sourceStr = judgeStorageSource();
if(sourceStr != "fillout-information" && sourceStr != "active-success"){
    alert("非法访问");
    window.location.href = `/${sourceStr}.html`;
}else{
    window.localStorage.setItem("source","active-success");
    
}


var buttonsDOM = document.querySelectorAll(".button");
addEventListenerOnBtns();

function addEventListenerOnBtns() {
    for (let i = 0; i < buttonsDOM.length; i++) {
        buttonsDOM[i].addEventListener("click", function () {
            let idStr = buttonsDOM[i].getAttribute("id");

            if (idStr === "go-insurance-msg") {
                // window.localStorage.setItem("source","active-success");
                // 点击查看投保信息按钮跳转到投保信息页
                window.location.href = `/insurance-msg.html`;

            } else if (idStr === "exit") {
                // 点击安全退出按钮 弹出弹窗
                exitAlertDOM.style.display = "block";
            } else if (idStr === "go-index") {
                // 点击首页按钮跳转到首页
                clearStorage();
                window.location.href = `/index.html`;

            } else if (idStr === "go-active") {
                // 点击服务卡激活按钮跳转到激活页面
                clearStorage();
                window.location.href = `/card-active.html`;

            } else if (idStr === `cancel`) {
                // 点击取消按钮 弹窗从界面隐藏
                exitAlertDOM.style.display = "none";
            }
        });
    }
}