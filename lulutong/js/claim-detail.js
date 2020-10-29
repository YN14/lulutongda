/*
 * @Author: your name
 * @Date: 2020-10-22 14:55:15
 * @LastEditTime: 2020-10-29 10:03:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lulutong\js\claim-list.js
 */
var buttonsDOM = document.querySelectorAll(".button");
var exitAlertDOM = document.querySelector(".exit-alert-box");

// 判断缓存是否有内容
var cardNum = judgeStorage();
var causeId = window.localStorage.getItem("causeId");
// 检测源-claimList
var sourceStr = judgeStorageSource();
if(sourceStr != "claim-list" && sourceStr != "claim-detail"){
    alert("非法访问");
    window.location.href = `/${sourceStr}.html`;
}else{
    window.localStorage.setItem("source","claim-detail");
}

// 给页面按钮绑定点击事件
addClickListenerOnBtns();

// 获取理赔信息
getClaimDetail();


function getClaimDetail() {
    myajax({
        "method": "get",
        "url": config.apiUrl+"getClaim.php",
        "asyn": true,
        "arg": { "cardNum": cardNum, "causeId":causeId},
        "success": function (re) {
            if (re.state === true) {
                // 显示理赔详情
                showClaimDetail(re.data[0]);
            }else{
                
            }
        },
        "erro": function (e) {
            document.querySelector(".erro").innerHTML = "服务器错误,请联系管理员";
        }
    });
}

function showClaimDetail(arr) {
    document.querySelector(".card-num").innerHTML = cardNum;
    let tmp = "";
    tmp = ` <li>
                <span>被保人姓名：<span>${arr.proposerName}</span></span>
            </li>
            <li class="bank">
                <span>银行: <span>${arr.bank}</span></span>
                <span>银行账户：<span>${arr.bankNum}</span></span>
            </li>
            <li class="phone-num">
                <span>联系电话：<span>${arr.phoneNum}</span></span>
            </li>
            <li class="address">
                <span>联系地址：<span>${arr.address}</span></span>
            </li>
            <li>
                <span class="cause-handling">案件处理：<span>${arr.causeHandling}</span></span>
                <span class="denial">退案、拒赔及原因：<span>${arr.denial}</span></span>
                <span class="cause-status">案件状态：<span>${arr.causeStatus}</span></span>
            </li>
            <li class="cause">
                <span class="data-status">资料状态：<span>${arr.dataStatus}</span></span>
                <span class="submitter">交件人：<span>${arr.submitter}</span></span>
                <span class="submitter">收件人：<span>${arr.recipient}</span></span>
                <span class="recipient-date">收件日期：<span>${arr.recipientDate}</span></span>
            </li>
            <li class="time">
                <span class="actions-date">生效时间：<span>${arr.actionsDate}</span></span>
                <span class="creat-time">出险时间：<span>${arr.time}</span></span>
                <span class="finish-time">完成时间：<span>${arr.completionDate}</span></span>
            </li>
            <li class="reason">
                <div>原因 :<br>
                    <p>${arr.cause}</p>
                </div>
            </li>
            <li class="type">
                <span>申请类别：<span>${arr.type}</span></span>
            </li>
            <li class="cause-level">
                <span>伤残等级：<span>${arr.causeLevel}</span>级</span>
            </li>
            <li class="money">
                <span>发票金额：<span class="invoice">${arr.invoice}</span></span>
                <span>第三方赔付：<span class="third-party-claims">${arr.thirdPartyClaims}</span></span>
                <span class="payout">赔款：<span>${arr.payout}</span></span>
                <span class="payee">领款人：<span>${arr.payee}</span></span>
            </li>`;
    document.querySelector(".detail").innerHTML = tmp;

    if(arr.completionDate === ""){
        document.querySelector(".finish-time").innerHTML = "";
    }
}

function addClickListenerOnBtns() {
    for (let i = 0; i < buttonsDOM.length; i++) {
        buttonsDOM[i].addEventListener("click", function () {
            let idStr = buttonsDOM[i].getAttribute("id");

            if (idStr === "go-claim-list") {
                // 点击查看投保信息按钮 跳转到投保信息页
                window.location.href = "/claim-list.html";
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