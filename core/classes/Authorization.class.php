<?php

class Authorization {

    public static $table = 'user';

    public static $user = false;

    public static function getCurrentUser() {

        if(Authorization::isAuthorized()) return ModelHandler::get('Users', array($_COOKIE['user_id']));
        else return false;
    }

    public static function makeAuth($args) {

        $md5pass = md5($args[1].Config::$Security['passwordsalt']);
        $table = Config::$DBConf['prefix'].Authorization::$table;
        $row = DB::getRow("Select * From $table Where `login`='$args[0]' and `password`='$md5pass'");
        if($row != NULL && $row['status'] == '0' ){
            self::$user = $row;
            DB::exec( "UPDATE $table SET `status` = 1 WHERE `login` = '".$args[0]."'" );
            setcookie("user_name",$row['name'], time()+60*60*24*365);
            setcookie("user_id",$row['id'], time()+60*60*24*365);
            return $row['category'];
        }else return NULL;
    }

    public static function logout() {
        $table = Config::$DBConf['prefix'].Authorization::$table;
        $return = DB::exec( "UPDATE $table SET `status` = 0 WHERE `id` = '".$_COOKIE['user_id']."'" );
        return $return;
    }

    public static function isAuthorized() {
        if( isset( $_COOKIE['user_id'] ) && isset( $_COOKIE['user_name'] ) )
            return true;
        else return false;

    }




}


?>
