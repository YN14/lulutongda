/*
 * @Author: your name
 * @Date: 2020-10-22 16:33:02
 * @LastEditTime: 2020-10-27 15:53:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lulutong\js\reg.js
 */
function RegQ() {

    //手机号
    this.phone = function ( str ) {
        var isMatch = /^1[3456789][0-9]{9}$/.test( str );
        return isMatch;
    }

    //座机号
    this.plane = function( str ) {
        var isMatch = /^[0][2-9]{2,3}-[0-9]{5,8}$/.test( str );
        return isMatch;
    }

    //邮箱
    this.mail = function ( str ) {
        var isMatch = /^[0-9a-z][0-9a-z_]{3,31}@(qq.com|163.com|yahoo.com|163.net|126.com)$/i.test( str );
        return isMatch;
    }

    //身份证
    this.idNumber = function ( str ) {
        var isMatch = /^[1-9][0-9]{16}[0-9X]$/.test(str);
        return isMatch;
    }

    //手机号/座机号
    this.telephoneNumber = function (str){
        str = str.toString();
        var isNumberType = false;
        if(str.substr(0,1) === "1"){
            if(this.phone(str)){
                isNumberType = true;
            }
        }else if(str.substr(0,1) === "0"){
            if(this.plane(str)){
                isNumberType = true;
            }
        }
        return isNumberType;
    }

    //用户名
    this.userName = function ( str ) {
        var isMatch = /^[a-zA-Z][\w_-]{3,19}/.test( str );
        return isMatch;
    }

    /**
     * \w 数字或字母  \W 非数字、字母 
     * (?![0-9]+$) 声明该位置后面不全是数字
     * (?![a-zA-Z]+$) 声明该位置后面不全是字母
     */
     //密码
    this.password = function( str ) {
        var isMatch = /^(?![0-9]+$)(?![a-zA-Z]+$)[\w@&$#-_!.*]{6,14}$/.test(str);
        return isMatch;
    }

    //邮编
    this.postcode = function ( str ){
        var isMatch = /^[1-5][0-9]{5}/.test(str);
        return isMatch;
    }

    //QQ
    this.qqNumber = function(str){
        var isMatch = /^{1-9}\d{4,10}/.test(str);
        return isMatch;
    }

    // 卡号
    this.cardNum = function (str){
        var isMatch = /^[1-9][0-9]{11}$/.test(str);
        return isMatch;
    }
}