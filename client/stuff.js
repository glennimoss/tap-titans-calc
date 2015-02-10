$(window).load(
	function start()
	{
		getStageData();
		populateHDT();
	}
);

$( "#stage" ).change(function() {
	getStageData();
});

$( "#revivetime" ).change(function() {
	getStageData();
});

function getStageData()
{
	$("#stage-result").html("Stage " + $("#stage").val() + " base HP: " + GetStageBaseHP($("#stage").val()) + "<br>");
	$("#stage-result").append("Stage " + $("#stage").val() + " base Gold: " + GetStageBaseGold($("#stage").val()) + "<br>");
	$("#stage-result").append("Hero revive time: " + getHeroReviveTime() + "<br>");
}

function GetStageBaseHP(stage)
{
     return ((18.5 * Math.pow(1.57, Math.min(stage, 156))) * Math.pow(1.17, Math.max((stage - 156),0)));
}

function GetStageBaseGold(stage)
{
    var num2 = GetStageBaseHP($("#stage").val()) * (0.02 + (0.00045 * Math.min(stage, 150.0)));
    //return (num2 * Math.Ceiling((double) (1.0 + PlayerModel.instance.GetStatBonus(BonusType.GoldAll))));
	return num2;
}

function getHeroReviveTime()
{
	//Random.Range(1, 5) +
    var num = (Math.ceil(((($("#stage").val() - 50)) / 10.0)));
    var num2 = num * 3600;
    if (num2 > 86400.0)
    {
        num2 = 86400.0;
    }
    var num3 = num2 * ($("#revivetime").val()/100);
    num2 -= num3;
	if ($("#stage").val() <= 50)
	{
		return "hero can't die";
	}
	else
	{
		//return formatTime(num2);
		return formatTime(num2);
	}
}

function formatTime(seconds)
{
	seconds = Number(seconds);
	var h = Math.floor(seconds / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 3600 % 60);
	return ((h > 0 ? h + ":" : "") + (m > 0 ? (h > 0 && m < 10 ? "0" : "") + m + ":" : "00:") + (s < 10 ? "0" : "") + s);

}

function populateHDT()
{
	var table = "\"Early start\" strategy: <br>";
	table += "<table class=\"table table-striped\">";
	table += "<tbody><tr><th>Second of the fight</th><th>Big Boss</th><th>Small Boss</th></tr>"
	for (var x = 1; x <= 30; x++)
	{
		table += "<tr><td>" + x + "</td><td>" + ( x < 5 || x > 25 ? 0 : Math.round(( 0.2 * ((1/21) + ((1/21) * (x - 5))) )*1000)/10 ) + "%</td><td>" + ( x < 5 || x > 25 ? 0 : Math.round(( 0.05 * ((1/21) + ((1/21) * (x - 5))) )*1000)/10 ) + "%</td></tr>"
	}
	table += "</tbody></table>";

	table += "\"Late start\" strategy: <br>";
	table += "<table class=\"table table-striped\">";
	table += "<tbody><tr><th>Second of the fight</th><th>Big Boss</th><th>Small Boss</th></tr>"
	for (var x = 1; x <= 30; x++)
	{
		table += "<tr><td>" + (x == 30 ? x + "+" : x) + "</td><td>" + ( x < 5 || x > 25 ? 0 : Math.round(( 0.2 * ((1/21) + ((1/21) * (25 - x))) )*1000)/10 ) + "%</td><td>" + ( x < 5 || x > 25 ? 0 : Math.round(( 0.05 * ((1/21) + ((1/21) * (25 - x))) )*1000)/10 ) + "%</td></tr>"
	}
	table += "</tbody></table>";

	$("#dthchnctbl").html(table);
}

