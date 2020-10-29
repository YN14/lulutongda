/*
 * @Author: your name
 * @Date: 2020-10-22 11:49:05
 * @LastEditTime: 2020-10-29 10:04:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lulutong\js\read-clause.js
 */
var buttonsDOM = document.querySelectorAll(".button");
var exitAlertDOM = document.querySelector(".exit-alert-box");
var checkAllDOM = document.querySelector(".check-all");
var checkItemsDOM = document.querySelectorAll(".check");

// 判断缓存是否有内容
var cardNum = judgeStorage();
var sourceStr = judgeStorageSource();
if(sourceStr != "card-active" && sourceStr != "read-clause"){
    alert("非法访问");
    window.location.href = `/${sourceStr}.html`;
}else{
    window.localStorage.setItem("source","read-clause");
}

// 勾选一项
addClickListenerOnCheckOneDOM();
// 勾选所有项
addClickListenerOnCheckAllDOM();
// 页面按钮点击事件
addEventListenerOnBtns();

getCardMsg(cardNum);


function addClickListenerOnCheckOneDOM() {
    let checkSum = 0;
    for (let i = 0; i < checkItemsDOM.length; i++) {
        checkItemsDOM[i].addEventListener("click", function () {
            document.querySelector(".erro-text-box").innerHTML = "";
            if (checkItemsDOM[i].checked === true) {
                checkSum = checkSum + 1;
                if (checkSum === checkItemsDOM.length) {
                    checkAllDOM.checked = true;
                }
            } else {
                if (checkSum > 0) {
                    checkSum = checkSum - 1;
                }
                checkAllDOM.checked = false;
            }
        });
    }
}
function addClickListenerOnCheckAllDOM() {
    checkAllDOM.addEventListener("click", function () {
        document.querySelector(".erro-text-box").innerHTML = "";
        if (checkAllDOM.checked === true) {
            checkAll();
        } else {
            cancelAll();
        }
    });
}

function addEventListenerOnBtns() {
    for (let i = 0; i < buttonsDOM.length; i++) {
        buttonsDOM[i].addEventListener("click", function () {
            let idStr = buttonsDOM[i].getAttribute("id");

            if (idStr === "agree") {
                //判断check是否都已勾选
                if (checkAllDOM.checked === true) {
                    // window.localStorage.href("source","read-clause");
                    // 都已勾选跳转到信息填写页
                    window.location.href = "/fillout-information.html";
                } else {
                    document.querySelector(".erro-text-box").innerHTML = "未阅读并同意全部保险条款";
                }
            } else if (idStr === "exit") {
                // 点击安全退出按钮 弹出弹窗
                exitAlertDOM.style.display = "block";
            } else if (idStr === "go-index") {
                // 点击首页按钮跳转到首页
                clearStorage();
                window.location.href = "/index.html";

            } else if (idStr === "go-active") {
                // 点击服务卡激活按钮跳转到激活页面
                clearStorage();
                window.location.href = "/card-active.html";

            } else if (idStr === "cancel") {
                // 点击取消按钮 弹窗从界面隐藏
                exitAlertDOM.style.display = "none";

            }
        });
    }
}

function checkAll() {
    for (let i = 0; i < checkItemsDOM.length; i++) {
        checkItemsDOM[i].checked = true;
    }
}
function cancelAll() {
    for (let i = 0; i < checkItemsDOM.length; i++) {
        checkItemsDOM[i].checked = false;
    }
}

function getCardMsg(cardNumStr) {
    myajax({
        "method": "get",
        "url": config.apiUrl+"getCard.php",
        "arg": { "cardNum": cardNumStr },
        "success": function (re) {
            if (re.state === true) {
                // 展示卡信息
                showCardMsg(re.data[0]);
            }
        },
        "erro": function (e) {
            document.querySelector(".erro").innerHTML = "服务器错误,请联系管理员";
        }
    });
}

function showCardMsg(obj) {

    let infoListDOM = document.querySelector(".info-list");
    let tmp = "";
    tmp = `<li>
                <span class="card-type title">畅行无忧${obj.cardType.toUpperCase()}卡</span>
                <span>面值<span class="color-text">${obj.cardMoney}</span>元</span>
            </li>
            <li>
                <span class="title">注意：18-70岁限激活2份,1-17岁限激活0份</span>
            </li>
            <li>
                <span class="title">保额信息:</span>
            </li>
            <li>
                <span class="title">交通意外身故、伤残最高保险金额 <span class="color-text">${obj.accidental}</span> 元</span>
            </li>
            <li>
                <span class="title">交通意外医疗最高保险金额 <span class="color-text">${obj.medical}</span> 元</span>
            </li> `;
    infoListDOM.innerHTML = tmp;
}
