<?php

class PagesController extends BaseController {

    public static $alias = "Страницы";
    
    public static $name = "Pages";
    
    public static $inAdminPanel = false;
    
    public static function index() {
        
        $post  = ModelHandler::get("Posts");

        $post = array_reverse($post);
        
        $content = ViewHandler::wrapGroup("post", $post, 10);
        Template::reset();
        Template::assign("content",$content);
        Template::assign("allpostslink","<p><a href=\"?/posts/lst\">Показать все записи</a></p>");
        echo Template::render("main.html");
    }
    
    
    
}

?>
