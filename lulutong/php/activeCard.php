<?php
/*
 * @Author: your name
 * @Date: 2020-10-23 14:09:53
 * @LastEditTime: 2020-10-27 10:04:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lulutong\php\activeCard.php
 */
    session_start();
    
    // 编码
    header("Content-type: text/html; charset=utf-8");

    // 创建数据库实例
    $dbc = new MySQLi("127.0.0.1","root","root","datacard");
    
    // 查询编码设置
    mysqli_query($dbc, "set names utf8");

    // 默认值
    $cardNum = "";
    $cardPwd = "";
    $authCodeFront = "";
    $authCodeBack = $_SESSION['authnum_session'];
    $sendTime = "";
    $sign = "";

    // 参数修改
    if(isset($_POST['cardNum'])){ $cardNum = $_POST['cardNum'];}
    if(isset($_POST['cardPwd'])){ $cardPwd = $_POST['cardPwd'];}
    if(isset($_POST['authCode'])){ $authCodeFront = $_POST['authCode'];}
    if(isset($_POST['sendTime'])){$sendTime = $_POST['sendTime'];}
    if(isset($_POST['sign'])){$sign = $_POST['sign'];}

    // 后端加密
    $obj = array(
        "cardNum"=>$cardNum,
        "cardPwd"=>$cardPwd,
        "authCode"=>$authCodeFront,
        "sendTime"=>$sendTime
    );
    // 排序
    ksort($obj);
    // 拼接字符串
    $str = "";
    foreach($obj as $i=>$v){
        $str = $str."&".$i."=".$v;
    }
    $strResult = substr($str,1);
    // 拼接key
    $key = "Kl0TcmzkBFbhD7otuQeMcfOAmnzy6KoC";
    $strResult = $strResult.$key;
    // md5加密
    $singBack = md5($strResult);

    // 比对sign值
    if($sign !== $singBack){
        // 返回结果，转换为JSON字符串
        $re = array(
            "state"=>true,
            "isMatch"=>false,
            "code"=>0,
            "msg"=>'数据被篡改'
        );
        $reJSONStr = json_encode($re);

        // 返回结果字符串
        echo $reJSONStr;
    }else{
        // 拼接查询语句
        $sql = "select * from carddata where cardNum=$cardNum;";

        // 执行查询语句
        $result = $dbc->query($sql);

        // 以数组的形式获取sql执行的结果
        $arr = array();
        while($tmp = $result->fetch_assoc()){
            $arr[] = $tmp;
        }

        $state = true;
        $code = array();

        if($authCodeFront != $authCodeBack){
            // 验证码不正确
            $code[] = 0;
            $state = false;
        }else{
            // 验证码正确
            $code[0] = 1;
            if(count($arr) === 0){
                // 卡号不存在
                $code[] = 0;
                $state = false;
            }else{
                // 卡号存在
                $code[1] = 1;
                if($arr[0]['actionType'] === "true"){
                    // 卡号被激活
                    $code[] = 1;
                    $state = false;
                }else{
                    // 卡号未激活
                    $code[2] = 0;
                    if($arr[0]['cardPWD'] != $cardPwd){
                        // 密码错误
                        $code[] = 0;
                        $state = false;
                    }else{
                        // 密码正确
                        $code[3] = 1;
                    }
                }
            }
        }
    
        // 返回结果，转换为JSON字符串
        $re = array(
            "state"=>$state,
            "isMatch"=>true,
            "code"=>$code,
            "msg"=>'查询成功'
        );
        $reJSONStr = json_encode($re);

        // 返回结果字符串
        echo $reJSONStr;
    }
?>
