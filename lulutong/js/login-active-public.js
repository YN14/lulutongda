/*
 * @Author: your name
 * @Date: 2020-10-23 13:49:47
 * @LastEditTime: 2020-10-27 16:18:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lulutong\js\login-public.js
 */
var inputDOM = document.querySelectorAll(".input");
var cardNumDOM = document.querySelector("#card-num");//卡号输入框
var cardPwdDOM = document.querySelector("#card-pwd");//卡密输入框
var cardPwdImg = document.querySelector(".password-img");//密码可见框
var authCodeDOM = document.querySelector("#auth-code");//验证码输入框
var authCodeImg = document.querySelector(".auth-code-img");//验证码图片

var flag = true;

// 输入框获取焦点，消去错误提示信息
addFocusListenerOnInputDOM();
//输入框失去焦点获取卡号、卡密判断合法性
addBlurListenerOnInputDOM();
// 点击小眼睛切换密码可见性
addClickListenerOnCardPwdImg();
//点击验证码图片刷新
addClickListenerOnAuthCodeImg();


function addFocusListenerOnInputDOM() {
    for (let i = 0; i < inputDOM.length; i++) {
        inputDOM[i].addEventListener("focus", function () {
            let idStr = inputDOM[i].getAttribute("id");
            document.querySelector("." + idStr + "-erro").innerHTML = "";
        });
    }
    document.querySelector(".card-erro").innerHTML = "";
}

function addBlurListenerOnInputDOM() {
    //获取卡号、卡密判断合法性
    cardNumDOM.addEventListener("blur", function () {
        judgeCardNumLegal();
    });
    cardPwdDOM.addEventListener("blur", function () {
        judgeCardPwdLegal();
    });
}

function judgeCardNumLegal() {
    let cardNum = cardNumDOM.value.trim();
    if (cardNum === "") {
        flag = false;
        showCardNumTips("null");
    } else {
        let reg = new RegQ();
        if (!reg.cardNum(cardNum)) {
            flag = false;
            showCardNumTips("unlegal");
        } else {
            flag = true;
        }
    }
}

function judgeCardPwdLegal() {
    let cardPwd = cardPwdDOM.value.trim();
    if (cardPwd === "") {
        flag = false;
        showCardPwdTips("null");
    } else {
        let reg = new RegQ();
        if(cardPwd.length < 18){
            // 密码
            if(reg.password(cardPwd) === false){
                flag = false;
                showCardPwdTips("unlegal");
            }else{
                flag = true;
            }
        }else if(cardPwd.length === 18){
            // 身份证号
            if(reg.idNumber(cardPwd) === false){
                flag = false;
                showCardPwdTips("unlegal");
            }else{
                flag = true;
            }
        }
    }
}

function showCardNumTips(str) {
    if (str === "null") {
        document.querySelector(".card-num-erro").innerHTML = "卡号不能为空";
    } else {
        // 卡号合法性判断
        document.querySelector(".card-num-erro").innerHTML = "请输入12位数字卡号";
    }
}

function showCardPwdTips(str) {
    if (str === "null") {
        document.querySelector(".card-pwd-erro").innerHTML = "服务卡密码不能为空";
    } else {
        // 卡密合法性判断
        document.querySelector(".card-pwd-erro").innerHTML = "密码或身份证号不合法";
    }
}

function addClickListenerOnCardPwdImg(){
    cardPwdImg.addEventListener("click",function(){
        let type = cardPwdDOM.type;
        let vNum = Math.floor(Math.random() * 20);
        if(type === "password"){
            cardPwdDOM.type = "text";
            cardPwdImg.src = `../images/pwdVisible.png?v=${vNum}`;
        }else if(type === "text"){
            cardPwdDOM.type = "password";
            cardPwdImg.src = `../images/pwdInvisible.png?v=${vNum}`;
        }
    });
}

function addClickListenerOnAuthCodeImg() {

    authCodeImg.addEventListener("click", function () {
        // 刷新验证码
        resetAuthCodeImg();
    });

}

function resetAuthCodeImg(){
    //随机获取版本号
    let vNum = Math.floor(Math.random() * 20);
    authCodeImg.src = `./php/authCode/validatecode.php?v=${vNum}`;
}

function toReadClausePage(){
    window.location.href = `/read-clause.html`;
}

function toInsuranceMsgPage(){
    window.location.href = "/insurance-msg.html";
}

function toClaimListPage(){
    window.location.href = "/claim-list.html";
}

function outputActiveError(re){
    if (re.code[0] === 0) {
        // 验证码错误
        document.querySelector(".auth-code-erro").innerHTML = "验证码错误";
    } else if (re.code[1] === 1) {
        if (re.code[2] === 1) {
            // 卡号已被激活
            document.querySelector(".card-num-erro").innerHTML = "卡号已激活，请退出选择登录";
        } else {
            // 卡号未被激活
            if (re.code[3] === 0) {
                // 密码错误
                document.querySelector(".card-pwd-erro").innerHTML = "卡号或密码不正确";
            }
        }
    } else if (re.code[1] === 0) {
        // 卡号不存在
        document.querySelector(".card-num-erro").innerHTML = "卡号不存在";
    }
}

function outputLoginError(re){
    if (re.code[0] === 0) {
        // 验证码错误
        document.querySelector(".auth-code-erro").innerHTML = "验证码错误";
    } else if (re.code[1] === 1) {
        if (re.code[2] === 0) {
            // 卡号未被激活
            document.querySelector(".card-num-erro").innerHTML = "卡号未激活，请退出选择激活";
        } else {
            // 卡号已激活
            if (re.code[3] === 0) {
                // 密码错误
                document.querySelector(".card-pwd-erro").innerHTML = "卡号或密码不正确";
            }
        }
    } else if (re.code[1] === 0) {
        // 卡号不存在
        document.querySelector(".card-num-erro").innerHTML = "卡号不存在";
    }
}

// 卡号写入缓存
function cardNumSetInStorage(cardNumStr){
    // id:卡号
    window.localStorage.setItem("id",cardNumStr);
}

// 加密
function encrypt(cardNum,cardPwd,authCode) {
    let key = "Kl0TcmzkBFbhD7otuQeMcfOAmnzy6KoC";
    // 获取当前时间戳
    let currTime = getNowTimestamp();
    let arg = { "cardNum": cardNum, "cardPwd": cardPwd, "authCode": authCode, "sendTime": currTime };
    let orderArg = sortJSON(arg);
    // 拼接
    let url = jsonToUrlString(orderArg) + key;
    // md5加密
    let sign = md5(url);
    orderArg.sign = sign;

    return orderArg;
}

function getNowTimestamp() {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    return timestamp;
}

function sortJSON(unordered) {
    var ordered = {};
    Object.keys(unordered).sort().forEach(function (key) {
        ordered[key] = unordered[key];
    });
    return ordered;
}

function jsonToUrlString(json) {
    var temp = '';
    for (var key in json) {
        if (temp == '') {
            temp = key + "=" + json[key];
        } else {
            temp = temp + '&' + key + "=" + json[key];
        }
    }
    return temp;
}