<?php

class AdminPanel {


    public static function getPanel() {

        if( !Authorization::isAuthorized() ) return;

        $panelStyles = API::parseStylesFile(CUSTOMPATH.DS."Global.views");
        $paneltpl = $panelStyles["VeronicaAdminPanel"][2];
        $menuItemtpl = $panelStyles["VeronicaMenuListItem"][2];
        $controllers = Api::getCustom("Controller");
        $modeles = Api::getCustom("Model");
        
        $user = Authorization::getCurrentUser();
        
        $userpanel = ViewHandler::wrap("CurrentUser", $user[0]);

        
        $paneltpl = str_replace("<? echo \$USERPANEL;?>", $userpanel, $paneltpl);
        
        $list = "";
        foreach ($controllers as $controller){
            if($controller::$inAdminPanel){
                
                $l = str_replace("<? echo \$ADDCLICKHANDLER;?>", "Controller.add('".$controller::$name."');", $menuItemtpl);
                $l = str_replace("<? echo \$CLICKHANDLER;?>", "Controller.openDashboard('".$controller::$name."');", $l);
                $l = str_replace("<? echo \$COUNT;?>", "Controller.openDashboard('".$controller::$name."');", $l);
                $list .= str_replace("<? echo \$ALIAS;?>", $controller::$alias, $l);
            }
        }
        $paneltpl = str_replace("<? echo \$MENULIST;?>", $list, $paneltpl);
        return $paneltpl;

    }

}



?>
