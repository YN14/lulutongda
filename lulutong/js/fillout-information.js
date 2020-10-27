/*
 * @Author: your name
 * @Date: 2020-10-22 14:34:32
 * @LastEditTime: 2020-10-27 16:32:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lulutong\js\fillout-information.js
 */
var buttonsDOM = document.querySelectorAll(".button");
var exitAlertDOM = document.querySelector(".exit-alert-box");
var relationTypeDOM = document.querySelector(".relation-type");

var nameDOM = document.querySelectorAll(".name");
var IDNumDOM = document.querySelectorAll(".ID-num");
var emailDOM = document.querySelectorAll(".email");
var phoneDOM = document.querySelectorAll(".phone");
var addDOM = document.querySelectorAll(".add");

var insureJSON = {};
var insurantJSON = {};
var nameClick = 0;

// 判断缓存是否有内容
var cardNum = judgeStorage();
document.querySelector(".card-num").innerHTML = cardNum;

// 给姓名、身份证号、邮箱、电话号码绑定监听事件
addListenerOnDOM();

// 选择与投保人关系时，若是投保人本人，自动填写受保人信息
selectRelationType();

// 设置生效日期期限
setDateRange();

// 点击按钮
addEventListenerOnBtns();

// 功能函数
function addListenerOnDOM() {

    // 当姓名号填充完毕 判断证件号是否合法 
    for (let i = 0; i < nameDOM.length; i++) {
        nameDOMOnBlur(nameDOM[i]);
        DOMOnFocus(nameDOM[i]);
    }
    // 当证件号填充完毕 判断证件号是否合法
    for (let i = 0; i < IDNumDOM.length; i++) {
        IDNumDOMOnBlur(IDNumDOM[i]);
        DOMOnFocus(IDNumDOM[i]);
    }
    // 当邮箱填充完毕 判断邮箱是否合法
    for (let i = 0; i < emailDOM.length; i++) {
        emailDOMOnBlur(emailDOM[i]);
        DOMOnFocus(emailDOM[i]);
    }
    // 当电话号码填充完毕 判断电话号码是否合法
    for (let i = 0; i < phoneDOM.length; i++) {
        phoneDOMOnBlur(phoneDOM[i]);
        DOMOnFocus(phoneDOM[i]);
    }
    // 当地址填充完毕 判断地址是否合法
    for (let i = 0; i < addDOM.length; i++) {
        addDOMOnBlur(addDOM[i]);
        // DOMOnFocus(addDOM[i]);
    }
}

function nameDOMOnBlur(dom) {
    dom.addEventListener("blur", function () {
        let name = dom.value;
        let idStr = dom.getAttribute("id");

        if (idStr === "insure-name" && nameClick === 1) {

            if (name === "") {
                document.querySelector("." + idStr + "-erro").innerHTML = "请填写姓名";
            } else {
                if (relationTypeDOM.value === "本人") {
                    document.querySelector("#insurant-name").value = name;
                }
            }
        }
        if (idStr === "insurant-name") {

            if (name === "") {
                document.querySelector("." + idStr + "-erro").innerHTML = "请填写姓名";
            } else {
                if (relationTypeDOM.value === "本人") {
                    document.querySelector("#insure-name").value = name;
                }
            }
        }
    });
}

function IDNumDOMOnBlur(dom) {
    dom.addEventListener("blur", function () {
        let idStr = dom.getAttribute("id");
        let IDNum = dom.value;
        if (IDNum === "") {
            document.querySelector("." + idStr + "-erro").innerHTML = "请填写证件号";
        } else {
            // 判断证件号
            let flag = jugeIDNum(IDNum);

            if (flag) {
                // 根据身份证号码自动填写性别
                autofillSex(IDNum, idStr);
                // 根据身份证号码自动填写出生日期
                autofillBirthDate(IDNum, idStr);
                //根据出生日期自动填写本卡生效时周岁
                let age = autofillAge(IDNum, idStr);

                if (relationTypeDOM.value === "本人") {
                    if (idStr === "insurant-ID") {
                        document.querySelector("#insure-ID").value = IDNum;
                    } else if (idStr === "insure-ID") {
                        document.querySelector("#insurant-ID").value = IDNum;
                    }
                }

                if (idStr === "insurant" && ((age + 1) < 18 || age >= 70)) {
                    document.querySelector("." + idStr + "-erro").innerHTML = "被保人年龄不在18-70周岁之间";
                }

            } else {
                document.querySelector("." + idStr + "-erro").innerHTML = "证件号填写不正确";
            }
        }
    });
}

function DOMOnFocus(dom) {
    dom.addEventListener("focus", function () {
        let idStr = dom.getAttribute("id");

        if (idStr === "insure-name") {

            nameClick = 1;

        }
        document.querySelector("." + idStr + "-erro").innerHTML = " ";
    });
}

function emailDOMOnBlur(dom) {
    dom.addEventListener("blur", function () {
        let idStr = dom.getAttribute("id");
        let emailStr = dom.value;
        if (emailStr !== "") {
            // 判断邮箱号
            let flag = jugeEmailStr(emailStr);
            if (!flag) {
                document.querySelector("." + idStr + "-erro").innerHTML = "邮箱填写不正确";
            } else {
                if (relationTypeDOM.value === "本人") {
                    if (idStr === "insurant-email") {
                        document.querySelector("#insure-email").value = emailStr;
                    } else if (idStr === "insure-email") {
                        document.querySelector("#insurant-email").value = emailStr;
                    }
                }
            }
        }
    });
}

function phoneDOMOnBlur(dom) {
    dom.addEventListener("blur", function () {
        let idStr = dom.getAttribute("id");
        let phoneStr = dom.value;
        if (phoneStr === "") {
            document.querySelector("." + idStr + "-erro").innerHTML = "请填写电话号码";
        } else {
            // 判断电话号码
            let flag = jugePhoneStr(phoneStr);
            let idStr = dom.getAttribute("id");

            if (!flag) {

                document.querySelector("." + idStr + "-erro").innerHTML = "电话号码填写不正确";
            }
        }
    });
}

function addDOMOnBlur(dom) {
    dom.addEventListener("blur", function () {
        let idStr = dom.getAttribute("id");
        let addStr = dom.value;
        if (addStr !== "") {
            if (relationTypeDOM.value === "本人") {
                if (idStr === "insurant-add") {
                    document.querySelector("#insure-add").value = addStr;
                } else if (idStr === "insure-add") {
                    document.querySelector("#insurant-add").value = addStr;
                }
            }
        }
    });
}

function jugeIDNum(idNumStr) {
    let reg = new RegQ();
    let flag = reg.idNumber(idNumStr);
    return flag;
}

function jugeEmailStr(emailStr) {
    let reg = new RegQ();
    let flag = reg.mail(emailStr);
    return flag;
}

function jugePhoneStr(phoneStr) {
    let reg = new RegQ();
    let flag = reg.telephoneNumber(phoneStr);
    return flag;
}

function autofillSex(IDNumStr, idStr) {
    // 获取性别标志位
    idStr = idStr.split("-")[0];
    let sexZoneBit = IDNumStr.substring(16, 17) - 0;
    let sexDOM = document.getElementsByName(idStr + "-sex");

    if (sexZoneBit % 2 === 1) {
        for (let i = 0; i < sexDOM.length; i++) {
            if (sexDOM[i].value === "男生") {
                sexDOM[i].checked = true;
            } else {
                sexDOM[i].checked = false;
            }
        }
    } else {
        for (let i = 0; i < sexDOM.length; i++) {
            if (sexDOM[i].value === "女生") {
                sexDOM[i].checked = true;
            } else {
                sexDOM[i].checked = false;
            }
        }
    }
}
function autofillBirthDate(IDNumStr, idStr) {
    idStr = idStr.split("-")[0];
    let birthDateZoneBit = IDNumStr.substring(6, 14);
    let birthDate = toDate(birthDateZoneBit);

    document.querySelector("." + idStr + "-birth-date").value = birthDate;
};
function autofillAge(IDNumStr, idStr) {
    idStr = idStr.split("-")[0];

    let myDate = document.querySelector(".effective-date").value;
    myDate = myDate.replace(/-/g, '/');
    myDate = new Date(myDate);
    let month = myDate.getMonth() + 1;
    let day = myDate.getDate();
    let age = myDate.getFullYear() - IDNumStr.substring(6, 10) - 1;
    if (IDNumStr.substring(10, 12) < month || IDNumStr.substring(10, 12) == month && IDNumStr.substring(12, 14) <= day) {
        age++;
    }
    document.querySelector("." + idStr + "-age").innerHTML = " " + age + " ";
    return age;
};

function selectRelationType() {
    relationTypeDOM.addEventListener("click", function () {

        let relationStr = relationTypeDOM.value;
        let insureSexDOM = document.querySelectorAll(".insure-sex");

        for (let i = 0; i < insureSexDOM.length; i++) {
            if (insureSexDOM[i].checked === true) {
                insureJSON.sex = insureSexDOM[i].value;
            }
        }

        // 获取投保人信息
        insureJSON.name = document.querySelector(".insure-name").value;
        insureJSON.IDType = document.querySelector("#insure-ID-type").value;
        insureJSON.IDNum = document.querySelector(".insure-ID-num").value;
        insureJSON.birthDate = document.querySelector(".insure-birth-date").value;
        insureJSON.age = document.querySelector(".insure-age").innerHTML.trim();
        insureJSON.email = document.querySelector(".insure-email").value;
        insureJSON.phone = document.querySelector(".insure-phone").value;
        insureJSON.Add = document.querySelector(".insure-Add").value;

        if (relationStr === "本人") {

            insurantJSON = insureJSON;
            // 自动填充被保人信息
            document.querySelector(".insurant-name").value = insurantJSON.name;
            document.querySelector("#insurant-ID-type").value = insurantJSON.IDType;
            document.querySelector(".insurant-ID-num").value = insurantJSON.IDNum;
            document.querySelector(".insurant-birth-date").value = insurantJSON.birthDate;
            document.querySelector(".insurant-age").innerHTML = " " + insurantJSON.age + " ";
            document.querySelector(".insurant-email").value = insurantJSON.email;
            document.querySelector(".insurant-phone").value = insurantJSON.phone;
            document.querySelector(".insurant-Add").value = insurantJSON.Add;

            let insurantSexDOM = document.getElementsByName("insurant-sex");
            for (let i = 0; i < insurantSexDOM.length; i++) {
                if (insurantSexDOM[i].value === insurantJSON.sex) {
                    insurantSexDOM[i].checked = true;
                }
            }
        } else {
            // 清除数据
            insurantJSON = {};
            let insurantDOM = document.querySelectorAll(".insurant");
            for (let i = 0; i < insurantDOM.length; i++) {
                if (insurantDOM[i].getAttribute("name") !== "insurant-sex") {
                    insurantDOM[i].value = "";
                } else {
                    insurantSexDOM = document.getElementsByName("insurant-sex");
                    for (let i = 0; i < insurantSexDOM.length; i++) {
                        if (insurantSexDOM[i].checked === true) {
                            insurantSexDOM[i].checked = false;
                        }
                    }
                }
            }
        }
    });
}

function toDate(str) {
    let year = str.substring(0, 4);
    let month = str.substring(4, 6);
    let day = str.substring(6, 8);

    let date = year + "-" + month + "-" + day;
    return date;
}

function addEventListenerOnBtns() {
    for (let i = 0; i < buttonsDOM.length; i++) {
        buttonsDOM[i].addEventListener("click", function () {
            let idStr = buttonsDOM[i].getAttribute("id");

            if (idStr === "go-insurance-msg") {
                //判断页面的信息是否填写完整且均正确
                let mustFillDone = isAllFill();
                if (mustFillDone === true) {
                    // 将投保人信息、被保人信息、激活日期、生效日期 存入数据库、修改数据库中此卡号的激活状态为激活
                    getInsurantInformationFromPage();
                    saveInformation();
                }
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

            } else if (idStr === "cancel") {
                // 点击取消按钮 弹窗从界面隐藏
                exitAlertDOM.style.display = "none";

            }
        });
    }
}

function setDateRange() {

    let effectiveDateDOM = document.querySelector(".effective-date");
    let effectiveDateTip = document.querySelector(".effective-date-tip");
    let minDate = new Date();
    let maxDate = new Date();
    minDate.setDate(minDate.getDate() + 2);
    maxDate.setDate(maxDate.getDate() + 62);

    effectiveDateDOM.min = minDate.getFullYear() + "-" + (minDate.getMonth() + 1) + "-" + minDate.getDate();
    effectiveDateDOM.max = maxDate.getFullYear() + "-" + (maxDate.getMonth() + 1) + "-" + maxDate.getDate();
    effectiveDateDOM.value = minDate.getFullYear() + "-" + (minDate.getMonth() + 1) + "-" + minDate.getDate();

    effectiveDateTip.innerHTML = "生效期限选择:" + effectiveDateDOM.min + "至" + effectiveDateDOM.max;
}

function isAllFill() {
    let flag = true;
    let undoneErroDOM = document.querySelector(".undone-erro");
    flag = jugeVal(nameDOM);
    if (!flag) {
        undoneErroDOM.innerHTML = "必填信息:姓名-未填写完整";
    }
    flag = jugeVal(IDNumDOM);
    if (!flag) {
        undoneErroDOM.innerHTML = "必填信息:身份证号-未填写完整";
    }
    flag = jugeVal(phoneDOM);
    if (!flag) {
        undoneErroDOM.innerHTML = "必填信息:电话号码-未填写完整";
    }
    return flag;
}

function jugeVal(dom) {
    for (let i = 0; i < dom.length; i++) {
        let val = dom[i].value;
        if (val === "") {
            return false;
        }
    }
    return true;
}

function getInsurantInformationFromPage() {

    let date = new Date();

    insureJSON.cardNum = cardNum;
    insureJSON.activeDate = document.querySelector(".effective-date").value;//生效日期
    insureJSON.actionDate = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();//激活日期

    insureJSON.name = document.querySelector(".insure-name").value;
    insureJSON.IDType = document.querySelector("#insure-ID-type").value;
    insureJSON.IDNum = document.querySelector(".insure-ID-num").value;
    insureJSON.birthDate = document.querySelector(".insure-birth-date").value;
    insureJSON.age = document.querySelector(".insure-age").innerHTML.trim();
    insureJSON.email = document.querySelector(".insure-email").value;
    insureJSON.phone = document.querySelector(".insure-phone").value;
    insureJSON.Add = document.querySelector(".insure-Add").value;

    let insureSexDOM = document.getElementsByName("insure-sex");
    for (let i = 0; i < insureSexDOM.length; i++) {
        if (insureSexDOM[i].checked === true) {
            insureJSON.sex = insureSexDOM[i].value;
        }
    }

    insurantJSON.withInsureRelation = document.querySelector(".relation-type").value;
    insurantJSON.name = document.querySelector(".insurant-name").value;
    insurantJSON.IDType = document.querySelector("#insurant-ID-type").value;
    insurantJSON.IDNum = document.querySelector(".insurant-ID-num").value;
    insurantJSON.birthDate = document.querySelector(".insurant-birth-date").value;
    insurantJSON.age = document.querySelector(".insurant-age").innerHTML.trim();
    insurantJSON.email = document.querySelector(".insurant-email").value;
    insurantJSON.phone = document.querySelector(".insurant-phone").value;
    insurantJSON.Add = document.querySelector(".insurant-Add").value;

    let insurantSexDOM = document.getElementsByName("insurant-sex");
    for (let i = 0; i < insurantSexDOM.length; i++) {
        if (insurantSexDOM[i].checked === true) {
            insurantJSON.sex = insurantSexDOM[i].value;
        }
    }

}

function saveInformation() {
    
    myajax({
        "method": "post",
        "url": config.apiUrl + "updateCard.php",
        "asyn": true,
        "type": "json",
        "arg": { "insureMsg": insureJSON, "insurantMsg": insurantJSON },
        "success": function (re) {
            if (re.state === true) {
                // 填写完整跳转到投保信息页
                window.location.href = "/insurance-msg.html";
            } else {

            }
        },
        "erro": function (e) {
            document.querySelector(".erro").innerHTML = "服务器错误,请联系管理员";
        }
    });
}