<?php


class UsersController extends BaseController {
    
    public static $alias = "Пользователи";
    
    public static $name = "Users";
    
    public static $inAdminPanel = true;
    
    public static function index() {
        echo "404";
    }
    
    public static function register($inviteKey) {
        $table = Config::$DBConf['prefix'].UsersModel::$table;
        $row = DB::getRow("Select * From $table Where `inviteKey`='$inviteKey[0]'");
        if( count($row) < 1 || $row['registred'] == "1" ) echo "404";
        else{
            
            
            
            
        }
        
        
        
        
        
        
        
    }
    
    
}

?>