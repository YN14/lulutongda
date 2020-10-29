/*
 * @Author: your name
 * @Date: 2020-10-22 14:55:15
 * @LastEditTime: 2020-10-29 10:09:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lulutong\js\claim-list.js
 */
var buttonsDOM = document.querySelectorAll(".button");
var exitAlertDOM = document.querySelector(".exit-alert-box");

// 判断缓存是否有内容
var cardNum = judgeStorage();
// 检测源-claimDetail\insuranceMsg\calimLogin
var sourceStr = judgeStorageSource();
if(sourceStr != "card-detail" && sourceStr != "insurance-msg" && sourceStr != "login-claim" && sourceStr != "claim-list"){
    alert("非法访问");
    window.location.href = `/${sourceStr}.html`;
}else{
    window.localStorage.setItem("source","claim-list");
}

// 给页面按钮绑定点击事件
addClickListenerOnBtns();

// 获取理赔信息
getClaimList();


function getClaimList() {
    myajax({
        "method": "get",
        "url": config.apiUrl+"getClaim.php",
        "asyn": true,
        "arg": { "cardNum": cardNum },
        "success": function (re) {
            if (re.state === true) {
                // 显示理赔信息列表
                showClaimList(re.data);
                // 给每一项绑定点击事件
                addClickListenerOnListItem();
            }else{
                
            }
        },
        "erro": function (e) {
            document.querySelector(".erro").innerHTML = "服务器错误,请联系管理员";
        }
    });
}

function showClaimList(arr) {
    document.querySelector(".card-num").innerHTML = cardNum;
    let claimBoxDOM = document.querySelector(".claim-box");
    if(arr.length === 0){
        claimBoxDOM.innerHTML = "暂无理赔信息";
    }else{
        let tmp = "";
        for( let i = 0; i < arr.length; i++){
            tmp += `<li class="claim-item" id = "cause-${arr[i].id}">
                        <div>案件状态 : <span class="state">${arr[i].causeStatus}</span></div>
                        <div>原因 :<br>
                            <p class="reason">${arr[i].cause}</p>
                        </div>
                        <div class="time">
                            <div>出险时间 : <span class="createtime">${arr[i].time}</span></div>
                            <div class="finishedtime">完成时间 : <span>${arr[i].completionDate}</span></div>
                        </div>
                    </li>`;
            if(arr[i].completionDate === ""){
                document.querySelector(".finishedtime").innerHTML = "";
            }
        }
        document.querySelector(".claim-list").innerHTML = tmp;
    }
}

function addClickListenerOnListItem(){
    let claimListItemDOM = document.querySelectorAll(".claim-item");

    for(let i = 0; i < claimListItemDOM.length; i++){
        claimListItemDOM[i].addEventListener("click",function(){
            let causeId = claimListItemDOM[i].getAttribute("id").split("-")[1];
            window.localStorage.setItem("causeId",causeId);
            
            window.location.href = "/claim-detail.html";
        });
    }
}

function addClickListenerOnBtns() {
    for (let i = 0; i < buttonsDOM.length; i++) {
        buttonsDOM[i].addEventListener("click", function () {
            let idStr = buttonsDOM[i].getAttribute("id");

            if (idStr === "go-insurance-msg") {
                // window.localStorage.setItem("source","claim-list");
                // 点击查看投保信息按钮 跳转到投保信息页
                window.location.href = "/insurance-msg.html";
            } else if (idStr === "exit") {
                // 点击安全退出按钮 弹出弹窗
                exitAlertDOM.style.display = "block";
            } else if (idStr === "go-index") {
                // 点击首页按钮跳转到首页
                // 此用户登录状态修改(退出登录)
                clearStorage();
                window.location.href = "/index.html";

            } else if (idStr === "go-login") {
                // 点击服务卡激活按钮跳转到激活页面
                // 此用户登录状态修改(退出登录)
                clearStorage();
                window.location.href = "/login-claim.html";

            } else if (idStr === "cancel") {
                // 点击取消按钮 弹窗从界面隐藏
                exitAlertDOM.style.display = "none";

            }
        });
    }
}
