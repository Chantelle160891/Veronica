var Cookie = {};
Cookie.setCookie = function (name, value, expires_year, expires_month, expires_day, path, domain, secure){
	var cookie_string = name + "=" + escape(value);
	if (expires_year){
		var expires = new Date (expires_year, expires_month, expires_day);
		cookie_string += "; expires=" + expires.toGMTString();
	}
	if (path) cookie_string += "; path=" + escape(path);
	if (domain) cookie_string += "; domain=" + escape(domain);
	if (secure) cookie_string += "; secure";
	document.cookie = cookie_string;
}
Cookie.getCookie = function(cookie_name){
	var matches = document.cookie.match(new RegExp(
	  "(?:^|; )" + cookie_name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	))
	return matches ? decodeURIComponent(matches[1]) : false 
}
Cookie.removeCookie = function(cookie_name){
	var cookie_date = new Date();
	cookie_date.setTime (cookie_date.getTime() - 1);
	document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
}



