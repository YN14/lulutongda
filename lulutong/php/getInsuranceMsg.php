<?php
/*
 * @Author: your name
 * @Date: 2020-10-23 14:09:53
 * @LastEditTime: 2020-10-26 16:40:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lulutong\php\activeCard.php
 */
    // 编码
    header("Content-type: text/html; charset=utf-8");

    // 创建数据库实例
    $dbc = new MySQLi("127.0.0.1","root","root","datacard");
    
    // 查询编码设置
    mysqli_query($dbc, "set names utf8");

    // 默认值
    $cardNum = "";

    // 参数修改
    if(isset($_GET['cardNum'])){ $cardNum = $_GET['cardNum'];}

    $sql = "select * from carddata a left join proposer b on  a.cardNum=b.cardNum left join beneficiary c on a.cardNum=c.cardNum where a.cardNum=$cardNum;";

    // 执行查询语句
    $result = $dbc->query($sql);

    // 以数组的形式获取sql执行的结果
    $arr = array();
    while($tmp = $result->fetch_assoc()){
        $arr[] = $tmp;
    }

    // 返回结果，转换为JSON字符串
    $re = array(
        "state"=>true,
        "code"=>1,
        "msg"=>'查询成功',
        "data"=>$arr
    );
    $reJSONStr = json_encode($re);

    // 返回结果字符串
    echo $reJSONStr;
?>
