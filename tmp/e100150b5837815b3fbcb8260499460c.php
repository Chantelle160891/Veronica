<?php if(!class_exists('TPL')){exit;}?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<!--
Design by Free CSS Templates
http://www.freecsstemplates.org
Released for free under a Creative Commons Attribution 2.5 License

Name       : Inscriptions  
Description: A two-column, fixed-width design with dark color scheme.
Version    : 1.0
Released   : 20101129

-->
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="keywords" content="" />
<meta name="description" content="" />
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>Мой бложик</title>
<?php echo $JSINCLUDE;?>

<?php echo $CSSINCLUDE;?>

</head>
<body> <? if(UsersModel::isAuthorized()) echo AdminPanel::getPanel();?>

<div id="wrapper">
	<div id="page">
		<div id="page-bgtop">
			<div id="page-bgbtm">
				<div id="content">
					<?php echo $content;?>

                                        
				</div>
				<!-- end #content -->
				<div id="sidebar">
					<div id="logo">
						<h1><a href="#">Veronica Blog</a></h1>
						<p>Design by <a href="#">Neronmoon</a></p>
					</div>
                                    
					<div id="menu">
						
                                                <p >Знаешь, а ведь вполне может быть, что ты – обыкновенный овощ и тебя давным-давно сожрало какое-то травоядное чудовище, желудочный сок которого способен вызывать правдоподобные галлюцинации у перевариваемой пищи, так что ты всего лишь наслаждаешься сокрушительной иллюзией своей замечательной, интересной жизни напоследок... Тебе нравится твоя галлюцинация? </p>
                                                
					</div>
					
				</div>
				<!-- end #sidebar -->
				<div style="clear: both;">&nbsp;</div>
			</div>
		</div>
	</div>
	<!-- end #page -->
</div>
<div id="footer">
	<p>Copyright (c) 2011 Veronica Domain. All rights reserved. Design by <a href="#">Neronmoon</a>.</p>
</div>
<!-- end #footer -->
</body>
</html>
