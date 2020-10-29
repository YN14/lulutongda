/*
 * @Author: your name
 * @Date: 2020-10-22 15:03:01
 * @LastEditTime: 2020-10-29 10:10:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lulutong\js\login-claim.js
 */
var buttonDOM = document.querySelector(".button");//下一步

// 清除缓存
clearStorage();
window.localStorage.setItem("source","login-insurance");
resetAuthCodeImg();

// 给下一步按钮绑定点击事件
addListenerOnNextBtn();

function addListenerOnNextBtn() {
    buttonDOM.addEventListener("click", function () {

        // 通过接口从数据库查询
        judgeCardNumPwdAuthCode();

    });
}

function judgeCardNumPwdAuthCode() {
    let cardNum = cardNumDOM.value.trim();
    let cardPwd = cardPwdDOM.value.trim();
    let authCode = authCodeDOM.value.toLowerCase();

    if (flag) {

        if (authCode === "") {
            // 提示验证码为空的错误信息
            document.querySelector(".auth-code-erro").innerHTML = "请输入验证码";

            // 刷新验证码
            resetAuthCodeImg();

        } else {
            // 加密
            let arg = encrypt(cardNum,cardPwd,authCode);
            // 调用接口获取查找相应的id对应的密码  都符合检查验证码是否正确
            myajax({
                "method": "post",
                "url": config.apiUrl+"login.php",
                "asyn": true,
                "arg":arg,
                "success": function (re) {
                    if (re.isMatch === false) {
                        document.querySelector(".erro-text-box").innerHTML = "被篡改，请联系管理员";
                    } else {
                        if (re.state === true) {
                            // 卡号、密码、验证码均正确
                            cardNumSetInStorage(cardNum);
                            // window.localStorage.setItem("source","login-insurance");
                            toInsuranceMsgPage();// 正确跳转到投保信息页
                        } else {
                            outputLoginError(re);
                        }
                    }
                },
                "erro": function (e) {
                    document.querySelector(".erro").innerHTML = "服务器错误,请联系管理员";
                }
            });
        }
    }
}