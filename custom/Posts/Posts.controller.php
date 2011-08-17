<?php

class PostsController extends BaseController {

    public static $alias = "Записи";
    
    public static $name = "Posts";
    
    public static $inAdminPanel = true;
    
    public static function index() {
        echo 404;
    }

    public static function lst($args) {
        $post  = ModelHandler::get("Posts");
        for ($i = 0; $i < count($post); $i++) {
            $newtags = "";
            $tags = explode(',', $post[$i]->bean['tags']);
            foreach ($tags as $tag) {
                $newtags .= "<a href='/?/posts/tag/".urlencode($tag)."'>".$tag."</a>, ";
            }
            $post[$i]->bean['tags'] =  substr($newtags, 0, strlen($newtags)-2);
            
        }
        $post = array_reverse($post);
        $content = ViewHandler::wrapGroup("post", $post);
        Template::reset();
        Template::assign("content",$content);
        Template::assign("allpostslink","");
        echo Template::render("main.html");
    }

    public static function tag( $args ) {

        $tag = str_replace('_', ' ', urldecode($args[0]));
        
        $filtred = array();
        $post  = ModelHandler::get("Posts");
        for ($i = 0; $i < count($post); $i++) {
            $tags = explode(',', $post[$i]->bean['tags']);
            if(in_array($tag, $tags) ) $filtred[] = $post[$i];
        }

        $post = $filtred;

        for ($i = 0; $i < count($post); $i++) {
            $newtags = "";
            $tags = explode(',', $post[$i]->bean['tags']);
            foreach ($tags as $tag) {
                $newtags .= "<a href='/?/posts/tag/".$tag."'>".$tag."</a>, ";
            }
            $post[$i]->bean['tags'] =  substr($newtags, 0, strlen($newtags)-2);

        }
        
        $post = array_reverse($post);
        $content = ViewHandler::wrapGroup("post", $post);
        Template::reset();
        Template::assign("content",$content);
        Template::assign("allpostslink","");
        echo Template::render("main.html");
        
        
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
