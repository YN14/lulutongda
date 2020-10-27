<?php
/*
 * @Author: your name
 * @Date: 2020-10-23 14:09:53
 * @LastEditTime: 2020-10-27 15:28:16
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

    // 参数修改
    $str = file_get_contents("php://input");

    $str = json_decode($str);

    $insureMsg = $str->insureMsg;
    $insurantMsg = $str->insurantMsg;

    $arr1 = array();
    $arr = array();

    $sql = "select * from carddata where cardNum='".$insureMsg->cardNum."'";
    $result = $dbc->query($sql);
    while($tmp = $result->fetch_assoc()){
        $arr1[] = $tmp;
    }

    if($arr1[0]['actionType'] === "true"){
        
        // $sql = "update carddata set actionType='true',actionUser='".$insureMsg->name."',benIDNum='".$insurantMsg->IDNum."',proIDNum='".$insureMsg->IDNum."',actionDate='".$insureMsg->actionDate."',activationDate='".$insureMsg->activeDate."' where cardNum = '".$insureMsg->cardNum."'";
        $sql = "update carddata set actionUser='".$insureMsg->name."',benIDNum='".$insurantMsg->IDNum."',proIDNum='".$insureMsg->IDNum."',actionDate='".$insureMsg->actionDate."',activationDate='".$insureMsg->activeDate."' where cardNum = '".$insureMsg->cardNum."'";
        $result1 = $dbc->query($sql);//$result1=1;
        $arr[] = $result1;

        $sql = "update proposer set id='".$arr1[0]['id']."',proName='".$insureMsg->name."',proCardType='".$insureMsg->IDType."',proCardTypeNum='".$insureMsg->IDNum."',cardNum='".$insureMsg->cardNum."',proGenders='".$insureMsg->sex."',proBirthday='".$insureMsg->birthDate."',activationDate='".$insureMsg->activeDate."',proEmail='".$insureMsg->email."',proPhoneNum='".$insureMsg->phone."',proAddress='".$insureMsg->Add."',proAge='".$insureMsg->age."' where cardNum = '".$insureMsg->cardNum."'";
        $result2 = $dbc->query($sql);
        $arr[] = $result2;

        $sql = "update beneficiary set id='".$arr1[0]['id']."',proName='".$insureMsg->name."',benName='".$insurantMsg->name."',benCardType='".$insurantMsg->IDType."',benCardTypeNum='".$insurantMsg->IDNum."',cardNum='".$insureMsg->cardNum."',benGenders='".$insurantMsg->sex."',benBirthday='".$insurantMsg->birthDate."',activationDate='".$insureMsg->activeDate."',benEmail='".$insurantMsg->email."',benphoneNum='".$insurantMsg->phone."',benAddress='".$insureMsg->Add."',benAge='".$insurantMsg->age."',relations='".$insurantMsg->withInsureRelation."' where cardNum = '".$insureMsg->cardNum."'";
        $result3 = $dbc->query($sql);
        $arr[] = $result3;

    }else{
        $sql = "update carddata set actionType='true',actionUser='".$insureMsg->name."',benIDNum='".$insurantMsg->IDNum."',proIDNum='".$insureMsg->IDNum."',actionDate='".$insureMsg->actionDate."',activationDate='".$insureMsg->activeDate."' where cardNum = '".$insureMsg->cardNum."'";
        // 执行查询语句
        $result1 = $dbc->query($sql);//$result1=1;
        $arr[] = $result1;

        $sql = "insert into proposer (id,proName,proCardType,proCardTypeNum,cardNum,proGenders,proBirthday,activationDate,proEmail,proPhoneNum,proAddress,proAge) values ('".$arr1[0]['id']."','".$insureMsg->name."','".$insureMsg->IDType."','".$insureMsg->IDNum."','".$insureMsg->cardNum."','".$insureMsg->sex."','".$insureMsg->birthDate."','".$insureMsg->activeDate."','".$insureMsg->email."','".$insureMsg->phone."','".$insureMsg->Add."','".$insureMsg->age."')";
        $result2 = $dbc->query($sql);
        $arr[] = $result2;

        $sql = "insert into beneficiary (id,proName,benName,benCardType,benCardTypeNum,cardNum,benGenders,benBirthday,activationDate,benEmail,benphoneNum,benAddress,benAge,relations) values ('".$arr1[0]['id']."','".$insureMsg->name."','".$insurantMsg->name."','".$insurantMsg->IDType."','".$insurantMsg->IDNum."','".$insureMsg->cardNum."','".$insurantMsg->sex."','".$insurantMsg->birthDate."','".$insureMsg->activeDate."','".$insurantMsg->email."','".$insurantMsg->phone."','".$insureMsg->Add."','".$insurantMsg->age."','".$insurantMsg->withInsureRelation."')";
        $result3 = $dbc->query($sql);
        $arr[] = $result3;
    }

    // 返回结果，转换为JSON字符串
    $re = array(
        "state"=>true,
        "code"=>1,
        "msg"=>'保存成功',
        "data"=>$arr
    );
    $reJSONStr = json_encode($re);

    // 返回结果字符串
    echo $reJSONStr;
?>
