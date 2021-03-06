var animator = new Animator();
var test = new Cake("#test",[{color: "#ffe228",value: 10,maxValue: 100, text: "Fall  12300"},
                            {color: "#7badf7",value: 40,maxValue: 100, text: "Winter  23000"},
                            {color: "#f77bea",value: 20,maxValue: 100, text: "Spring  10000"},
                            {color: "#32e532",value: 30,maxValue: 100, text: "Summer  45000"},
                          ], "People");
animator.add(test);
animator.add(test);

var colors = new Array(
  [62,35,255],
  [60,255,60],
  [255,35,98],
  [45,175,230],
  [255,0,255],
  [255,128,0]);

var step = 0;
//color table indices for:
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient()
{

  if ( $===undefined ) return;

var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "rgb("+r1+","+g1+","+b1+")";

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "rgb("+r2+","+g2+","+b2+")";

 $('.colors').css({
   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});

  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];

    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;

  }
}

var keepLogged = $("#scelta")[0].checked;

var login = $("#userarea")[0].innerHTML;

if(getCookie("logged") == "1"){
	var username = getCookie("user");
	$("#userarea")[0].innerHTML = "<h3>Welcome <b>" + username + "</b></h3><button id='logout' class='button'>Logout</button>";
	$("#logout")[0].onclick = () => {
		setCookie("logged", 0);
		$("#userarea")[0].innerHTML = login;
		registerLogin();
	};
}else{
	registerLogin();
}

function registerLogin(){
	$("#login")[0].onsubmit = () => {
		var keepLogged = $("#scelta")[0].checked;
		var username = $("#user")[0].value;
		var password = $("#pass")[0].value;
		if(username.length > 0 && password.length > 0){
			setCookie("logged", 1, keepLogged ? 10 : 0);
			setCookie("user", username, keepLogged ? 10 : 0);
			setCookie("pass", password, keepLogged ? 10 : 0);
			$("#userarea")[0].innerHTML = "<h3>Welcome <b>" + username + "</b></h3><button id='logout' class='button'>Logout</button>";
			$("#logout")[0].onclick = () => {
				setCookie("logged", 0);
				$("#userarea")[0].innerHTML = login;
				registerLogin();
			};
		}else{
			alert("Invalid Credentials");
		}
		return false;
	};
}

setInterval(updateGradient,10);
setInterval(updateGradient,10);

function setCookie(cname,cvalue,exdays=0) {
    var d = new Date();
	if(exdays != 0){
		    d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires=" + d.toGMTString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}else{
		document.cookie = cname + "=" + cvalue + ";" + "path=/";
	}
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}