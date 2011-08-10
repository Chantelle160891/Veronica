<?php

/**
 * Description of фjax
 *
 * @author alistar
 */


class Ajax {

    /**
     * Перенаправление ajax запроса на соответствующий модуль
     * 
     * @param data $data
     * @param string $url
     */
    public static function Run($args) {
        $url = $args['url'];
        $query = API::parseAjaxUrl($url);
        $name = $query[1].".".$query[2];
        if($query != null){
            $module = $query[1];
            $method = $query[2];
            $args = $query[3];
            $response[$name] = call_user_func_array($module.'::'.$method, $args);
        }else $response[$name] = false;
        echo json_encode($response);
    }

}


?>
