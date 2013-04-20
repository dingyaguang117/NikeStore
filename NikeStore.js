/*
console.log("myscript");
var image = chrome.extension.getURL("image/1.jpg");
var imgNode = '<img src="'+image+'"/>';
$("body").append(imgNode);*/


var isRun = false;

//处理twitter页面

function checkAvalible(request, sender, sendResponse)
{
	//alert($($(".js-tweet-text")[0]).text());
	var statuses = $("#stream-items-id .content");
	for(var i=0; i < statuses.length; ++i)
	{
		var time = $($(statuses[i]).find("._timestamp")[0]).attr("data-time");
		var status = $($(statuses[i]).find(".js-tweet-text")[0]);
		
		var time2 = new Date(parseInt(time) * 1000);
		//alert(status.text() +'\n' + time +'\n'+ time2.toLocaleString());
		
		
		if(status.text().indexOf('available') == -1)
		{
			continue;
		}
		var links = status.find("a");
		for(var j=0; j < links.length; ++j)
		{
			var link = $(links[j]);
			var url = link.attr('href');
			if(url.indexOf("http://t.co") == -1)
			{
				continue;
			}
			return url;
		}
		break;
	}
	return "";
}

//处理nike store 页面

function SubmitCart()
{
	$(document).ready(function()
	{

		//$('*[value="3211862:4Y"]').trigger("click");
		//$('*[name="skuAndSize"]').attr("value","3211862:4Y");
		$('*[name="skuAndSize"]').val("3211862:4Y");
		$('.selectBox-label').text("(4Y)");
		
		$('.add-to-cart').trigger("click");
		
		alert("clicked!");
	});
	//alert("registed!");
}



//消息转发
function RequestHandle(request, sender, sendResponse)
{
	console.log(sender.tab ?
			"from a content script:" + sender.tab.url :
			"from the extension");
	if (request.type == "checkAvalible")
	{
		sendResponse({data:checkAvalible(request, sender, sendResponse)});
	}
	else if (request.type == "SubmitCart")
	{
		SubmitCart();
		sendResponse({data:"ok"});
	}
	else if (request.type == "setRun")
	{
		isRun = true;
		sendResponse({data:"ok"});
	}
	else if (request.type == "setStop")
	{
		isRun = false;
		sendResponse({data:"ok"});
	}
	else
		sendResponse({data:"error"});
}



function main()
{
	console.log("started...");
	chrome.extension.onRequest.addListener(RequestHandle);
}


main();