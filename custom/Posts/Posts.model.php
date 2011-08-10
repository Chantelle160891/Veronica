<?php

class PostsModel extends BaseModel{
    
    public static $table = "posts";

    public static function save($args) {
        
        if( count($args) != 3 ) return false;
        
        if( $args[2] ){
            $item = array(ModelHandler::getEmptyItem("Posts"));
            
        }else{
            $item = ModelHandler::get("Posts", array($args[0]));
        }
        foreach ($args[1] as $key => $value) {
            $item[0]->bean[$key] = $value;
        }
        
        return ModelHandler::save($item[0]);
        
    }
    
    public static function remove($args) {
        if( !(isset($args[0])) ) return false;
        $items = ModelHandler::get("Posts",$args);
        foreach ($items as $item) {
            ModelHandler::remove($item);
        }
        return true;
    }
    
}

?>
