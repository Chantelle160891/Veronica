<?php

class UsersModel extends BaseModel{
    
    public static $table = "user";
    
    public static $user = false;


    public static function makeInvite($email) {
        $bean = DB::dispense(Config::$DBConf['prefix'].UsersModel::$table);
        $bean->email = $email[0];
        $rand_array = array("a","b","c","d","e","f","g","h","i","j","k","l"
                            ,"m","n","o","p","q","r","s","t","u","v","w","x"
                            ,"y","z","!",1,2,3,4,5,6,7,8,9);
        $random_code = '';
        for($i=0;$i< 33;$i++){
             $rand_num = rand(0,sizeof($rand_array));
             $random_code .= $rand_array[$rand_num];
        }
        $invitekey = md5($random_code);
        $bean->inviteKey = $invitekey;
        $bean->registred = 0;
        mail($email[0], "Invite", URL."/?/users/register/$invitekey");
        return DB::store($bean);;
    }


    public static function makeAuth($args) {
        $md5pass = md5($args[1].Config::$Security['passwordsalt']);
        $table = Config::$DBConf['prefix'].UsersModel::$table;
        $row = DB::getRow("Select * From $table Where `login`='$args[0]' 
                                                    and `password`='$md5pass'");
        if($row['registred'] == "1" ){
            setcookie("user_id",$row['name']);
            self::$user = $row;
            return $row['category'];
        }else return NULL;        
    }
    
    public static function isAuthorized() {
        $user = $_COOKIE['user_id'];
        $table = Config::$DBConf['prefix'].UsersModel::$table;
        $row = DB::getRow("Select * From $table Where `login`='$user'");
        if( count($row) > 0 && $row['registred'] == "1" )  return true;
        //else{ self::$user = false; return false; }
        else return true;
        
    }

    public static function save(Item $item) {
        return ModelHandler::save($item[0]);
        
    }
    
    public static function remove(Item $item) {
        return ModelHandler::remove($item[0]);
    }
    
}

?>
