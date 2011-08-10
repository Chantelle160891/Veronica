<?php

class PostsController extends BaseController {

    public static $alias = "Записи";
    
    public static $name = "Posts";
    
    public static $inAdminPanel = true;
    
    public static function index() {
        echo 404;
    }
    
    public static function entry($args) {
        
        if( count($args) > 1 ) echo 404;
        else{
            
            $post  = ModelHandler::get("Posts", array($args[0]));
            $post = $post[0];
            $content = ViewHandler::wrap("post", $post);            
            $tpl = new TPL();
            $tpl->assign("content",$content);
            $tpl->draw("main");
            
        }
        
    }
    
    
    
}

?>
