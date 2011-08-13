<?php

class UsersModel extends BaseModel{
    
    public static $table = "user";

    public static function save(Item $item) {
        return ModelHandler::save($item[0]);
        
    }
    
    public static function remove(Item $item) {
        return ModelHandler::remove($item[0]);
    }
    
}

?>
