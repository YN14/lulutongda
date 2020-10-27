/*
 * @Author: your name
 * @Date: 2020-10-22 11:24:25
 * @LastEditTime: 2020-10-22 11:38:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lulutong\js\index.js
 */
var buttonsDOM = document.querySelectorAll(".button");

for(let i = 0; i < buttonsDOM.length; i++){
    // 为页面按钮绑定点击事件
    buttonsDOM[i].addEventListener("click",function(){

        // 获取按钮id
        let id = buttonsDOM[i].getAttribute("id");

        // 判断点的哪个按钮
        if(id === "card-active"){

            //跳转卡号激活页面
            window.location.href = `/card-active.html`;
 
        }else if(id === "insure-refer"){

            //跳转投保信息查看登录页面
            window.location.href = `/login-insurance.html`;

        }else if(id === "claim-refer"){

           //跳转理赔信息查看登录页面
           window.location.href = `/login-claim.html`;

        }
    });
}