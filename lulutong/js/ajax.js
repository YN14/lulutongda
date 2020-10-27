/*
 * @Author: your name
 * @Date: 2020-10-17 09:56:39
 * @LastEditTime: 2020-10-27 09:21:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ajax\ajax.js
 */
function myajax(option){

    //默认值
    let method = "get";
    let url = "";
    let type = "urlencode"
    let arg = {};
    let asyn = true;
    let success = function(){};
    let error = function(){};
    let argStr = "";

    //参数替换
    if(option){
        if(option.method) method = option.method;
        if(option.url) url = option.url;
        if(option.type) type = option.type;
        if(option.arg) arg = option.arg;
        if(option.success) success = option.success;
        if(option.error) error = option.error;
    }

    var xmlHttp = new XMLHttpRequest();

    // argStr = joinArg(arg);
    if(type === "urlencode"){
        argStr = joinArg(arg);
    }else if(type === "json"){
        argStr = JSON.stringify(arg);
    }

    //get方式
    if(method === "get"){ url += "?" + argStr; }

    xmlHttp.open(method, url, asyn);

    //post方式
    if(method==="get"){
        
        xmlHttp.send();
    }else{  
        if(type === "urlencode"){
            xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }else if(type === "json"){
            xmlHttp.setRequestHeader("Content-type", "application/json");
        }
        xmlHttp.send(argStr);
    }
    
    xmlHttp.onreadystatechange = function (e) {

        if (this.readyState == 4 && this.status == 200) {
            try{
                let data = JSON.parse(this.responseText);
                success( data );
            }catch(e){
                error(e);
            }
            
        }
    }

    //对象转网址参数字符串
    function joinArg(obj){

        let str = "";

        for (const item in obj) {
 
            str += `&${item}=${obj[item]}`;

        }

        str = str.substring(1,);

        return str;

    }

}




        
        