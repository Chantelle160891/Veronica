<?php

class AdminPanel {


    public static function getPanel() {

        $panelStyles = API::parseStylesFile(CUSTOMPATH.DS."Global.views");
        $paneltpl = $panelStyles["VeronicaAdminPanel"][2];
        $menuItemtpl = $panelStyles["VeronicaMenuListItem"][2];
        $controllers = Api::getCustom("Controller");
        $user = UsersModel::$user['name'];

        $paneltpl = preg_replace("/:USERNAME/", $user, $paneltpl);
        $list = "";
        foreach ($controllers as $controller){
            if($controller::$inAdminPanel){
                $l = preg_replace("/:CLICKHANDLER/", "Controller.openDashboard('".$controller::$name."');", $menuItemtpl);
                $list .= preg_replace("/:ALIAS/", $controller::$alias, $l);
            }
        }
        $paneltpl = preg_replace("/:MENULIST/", $list, $paneltpl);
        return $paneltpl;


    }

}



?>
