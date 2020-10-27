<?php
/*
 * @Author: your name
 * @Date: 2020-10-23 18:16:04
 * @LastEditTime: 2020-10-24 09:48:37
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \lulutong\php\authCode\validatecode.php
 */
session_start();
require_once 'ValidateCode.class.php';  //先把类包含进来，实际路径根据实际情况进行修改。
$_vc = new ValidateCode();  //实例化一个对象
$_vc->doimg();  
$_SESSION['authnum_session'] = $_vc->getCode();//验证码保存到SESSION中
?>