/*
 * @Author: your name
 * @Date: 2020-10-22 14:39:12
 * @LastEditTime: 2020-10-27 14:03:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lulutong\js\insurance-msg.js
 */
var selectCardItemsDOM = document.querySelectorAll(".select");
var buttonsDOM = document.querySelectorAll(".button");
var exitAlertDOM = document.querySelector(".exit-alert-box");

// 判断缓存是否有内容
var cardNum = judgeStorage();

// 给选项卡项绑定事件
addListenerOnSelectCardItems();
// 给页面按钮绑定事件
addListenerOnBtns();

// 根据卡号通过接口从数据库获取投保人信息、被保人信息、激活日期、生效日期
getInsuranceMse();

// 函数块
function addListenerOnSelectCardItems() {
    for (let i = 0; i < selectCardItemsDOM.length; i++) {
        selectCardItemsDOM[i].addEventListener("click", function () {
            let idStr = selectCardItemsDOM[i].getAttribute("id");
            if (idStr === "insure") {
                changeSelectCardItemClass(selectCardItemsDOM[i]);
                displayInfo();
                shouInfo(idStr+"-info");
            }else if(idStr === "insurant"){
                changeSelectCardItemClass(selectCardItemsDOM[i]);
                displayInfo();
                shouInfo(idStr+"-info");
            }else if(idStr === "benefit"){
                changeSelectCardItemClass(selectCardItemsDOM[i]);
                displayInfo();
                shouInfo(idStr+"-info");
            }
        });
    }
}

function changeSelectCardItemClass(dom){
    for (let j = 0; j < selectCardItemsDOM.length; j++) {
        selectCardItemsDOM[j].classList.remove("selected");
    }
    dom.classList.add("selected");
}

function displayInfo(){
    document.querySelector(".insure-info").style.display = "none";
    document.querySelector(".insurant-info").style.display = "none";
    document.querySelector(".benefit-info").style.display = "none";
}

function shouInfo(str){
    let dom = document.querySelector("."+str);
    dom.style.display = "block";
}

function addListenerOnBtns() {
    for (let i = 0; i < buttonsDOM.length; i++) {
        buttonsDOM[i].addEventListener("click", function () {
            let idStr = buttonsDOM[i].getAttribute("id");
            if (idStr === "go-claim-list") {
                // 点击查看理赔信息按钮 跳转到理赔列表页
                window.location.href = "/claim-list.html";
            } else if (idStr === "exit") {
                // 点击安全退出按钮 弹出弹窗
                exitAlertDOM.style.display = "block";
            } else if (idStr === "go-index") {
                // 点击首页按钮跳转到首页
                clearStorage();
                window.location.href = "http://127.0.0.1:5500/";

            } else if (idStr === "go-active") {
                // 点击服务卡激活按钮跳转到激活页面
                clearStorage();
                window.location.href = "/card-active.html";

            } else if (idStr === "go-login") {
                clearStorage();
                window.location.href = "/login-insurance.html";
            }
            else if (idStr === "cancel") {
                // 点击取消按钮 弹窗从界面隐藏
                exitAlertDOM.style.display = "none";
            }
        });
    }
}

function getInsuranceMse(){
    myajax({
        "method":"get",
        "url":config.apiUrl+"getInsuranceMsg.php",
        "asyn": true,
        "arg":{"cardNum":cardNum},
        "success":function(re){
            if(re.state === true){
                showInfoList(re.data[0]);
                showInsureInfo(re.data[0]);
                showInsurantInfo(re.data[0]);
            }else{

            }
        },
        "erro":function(e){
            document.querySelector(".erro").innerHTML = "服务器错误,请联系管理员";
        }
    });
}

function showInfoList(obj){
    let infoListDOM = document.querySelector(".info-list");
    let tmp = "";

    tmp = `<li>
                <span class="card-type title">畅行无忧${obj.cardType.toUpperCase()}卡</span>
                <span>面值<span class="color-text">${obj.cardMoney}</span>元</span>
            </li>
            <li>
                <span class="title">本卡卡号:<span class="card-num">${obj.cardNum}</span></span>
            </li>
            <li>
                <span class="title">本卡激活日期:<span>${obj.activationDate}</span></span>
            </li>
            <li>
                <span class="title">本卡保险生效日期:<span>${obj.actionDate}</span></span>
            </li>
            <li>
                <span class="title">本卡保额信息:</span>
            </li>
            <li>
                <span class="title">交通意外身故、伤残最高保险金额 <span class="color-text">${obj.accidental}</span> 元</span>
            </li>
            <li>
                <span class="title">交通意外医疗最高保险金额 <span class="color-text">${obj.medical}</span> 元</span>
            </li>`;
    infoListDOM.innerHTML = tmp;
}

function showInsureInfo(obj){
    let insureInfoDOM = document.querySelector(".insure-info");
    let tmp = "";
    tmp = `<ul class="info">
    <li><label>投保人姓名</label><span class="insure-name">${obj.proName}</span></li>
    <li><label>证件</label><span class="insure-ID-type">${obj.proCardType}</span></li>
    <li><label>证件号码</label><span class="insure-ID-code">${obj.proCardTypeNum}</span></li>
    <li><label>性别</label><span class="insure-sex">${obj.proGenders}</span></li>
    <li><label>出生日期</label><span class="insure-birth-date">${obj.proBirthday}</span></li>
    <li><label>电子邮箱</label><span class="insure-email">${obj.proEmail}</span></li>
    <li><label>手机号</label><span class="insure-phone">${obj.proPhoneNum}</span></li>
    <li><label>地址</label><span class="insure-Add">${obj.proAddress}</span></li>
</ul>`;
    insureInfoDOM.innerHTML = tmp;
}
function showInsurantInfo(obj){
    let insurantInfoDOM = document.querySelector(".insurant-info");
    let tmp = "";
    tmp = `<ul class="info">
    <li><label>被保人姓名</label><span class="insurant-name">${obj.benName}</span></li>
    <li><label>证件</label><span class="insurant-ID-type">${obj.benCardType}</span></li>
    <li><label>证件号码</label><span class="insurant-ID-code">${obj.benCardTypeNum}</span></li>
    <li><label>性别</label><span class="insurant-sex">${obj.benGenders}</span></li>
    <li><label>出生日期</label><span class="insurant-birth-date">${obj.benBirthday}</span></li>
    <li><label>电子邮箱</label><span class="insurant-email">${obj.benEmail}</span></li>
    <li><label>手机号</label><span class="insurant-phone">${obj.benphoneNum}</span></li>
    <li><label>地址</label><span class="insurant-Add">${obj.benAddress}</span></li>
    <li><label>是投保人</label><span class="relation-type">${obj.relations}</span></li>
</ul>`;
    insurantInfoDOM.innerHTML = tmp;
}