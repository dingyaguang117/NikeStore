// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


/*
function updateIcon() {
  chrome.browserAction.setIcon({path:"icon" + current + ".png"});
  chrome.browserAction.setBadgeText({text:"1"})
  current++;

  if (current > max)
    current = min;
   changeCurTabUrl();
}

function changeCurTabUrl()
{
	chrome.tabs.getSelected(null,function(tab)
	{
		console.log(tab);
		chrome.tabs.update(tab.id,{url:tab.url});

	});
}*/
var isRun = false;
var timer;

function RunStop()
{
	isRun = !isRun;
	if(isRun)
	{
		chrome.browserAction.setIcon({"path":"image/nike.png"});
		timer = setInterval(checkAvalible,1000);
	}else
	{
		chrome.browserAction.setIcon({"path":"image/nike2.png"});
		clearInterval(timer);
	}
}

function checkAvalible()
{
	console.log("checkAvalible");
	chrome.tabs.getSelected(null,
		function(tab)
		{
			chrome.tabs.sendRequest(tab.id, {type: "checkAvalible"},
			function(response)
			{
				//console.log(response.data);
				var url = response.data;
				chrome.tabs.update(tab.id,{url:url},watchNikeStore)
			});
		}
	);
	
}

function watchNikeStore(tab)
{
	//ֹͣˢ�¼��
	RunStop();
	//��ʼ��� nike store �������
	chrome.tabs.onUpdated.addListener(SubmitCart);
	console.log(tab.url);
	console.log("SubmitCarted!!!!");
}

function SubmitCart(tabId,changeInfo,tab)
{
	console.log('tab updated:'+tab.url);
	console.log(changeInfo);
	if(changeInfo.status != 'complete' || tab.url.indexOf('http://store.nike.com') == -1)
	{
		return;
	}
	chrome.tabs.sendRequest(tabId, {type: "SubmitCart"});
}


chrome.browserAction.onClicked.addListener(RunStop);

