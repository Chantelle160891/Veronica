<?php

class PagesController extends BaseController {

    public static $alias = "Страницы";
    
    public static $name = "Pages";
    
    public static $inAdminPanel = false;
    
    public static function index() {
        
        $post  = ModelHandler::get("Posts");
        $post = array_reverse($post);
        $content = ViewHandler::wrapGroup("post", $post);            
        $tpl = new TPL();
        $tpl->assign("content",$content);
        $tpl->draw("main");
    }
    
    
    
}

?>
