require.config({
	baseUrl : "/",
	paths : {
		jquery : "lib/jquery/jquery-1.12.4.min",
		template : "lib/art-template/template-web",
		cookie : "lib/jquery-plugins/jquery.cookie",
		fly :"lib/jquery-plugins/jquery.fly.min",
		zoom : "lib/jquery-plugins/jquery.elevateZoom-3.0.8.min",
		loadHF : "js/loadHeaderFooter"
	},
	shim : {
		zoom : {
			deps : ["jquery"]
		},
		fly :{
			deps :["jquery"]
		}
	}
	

});