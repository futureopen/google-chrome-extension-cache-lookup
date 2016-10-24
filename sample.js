var contextMap = {'google': [], 'archive':[]}
var contextTextLookup = {"selection":"selectionText", "link":"linkUrl", "page":"pageUrl", "image":"srcUrl"}
var contexts = Object.keys(contextTextLookup);

function openCached(info,tab) {
	//Based on menu item id, lookup the context (page, link, .....)
	var context = contextMap[info.menuItemId]
	//Based on context lookup what attribute to lookup
	var contextText = info[contextTextLookup[context]]

	//If menuItemId was created for google, archive, etc. do a lookup there
	if(contextMap['google'].indexOf(info.menuItemId) != -1)
		chrome.tabs.create({'url':'http://webcache.googleusercontent.com/search?q=cache:'+contextText})
	else if(contextMap['archive'].indexOf(info.menuItemId) != -1)
		chrome.tabs.create({'url':'https://web.archive.org/web/*/'+contextText})
}


for (var i = 0; i < contexts.length; i++){
	var context = contexts[i];
	var title = "Open '" + context + "' in";
	var contextId = chrome.contextMenus.create({"title": title, "contexts":[context]});
	var gCache = chrome.contextMenus.create({"title": "Google", "parentId": contextId, "onclick": openCached, "contexts":[context]});
	var aCache = chrome.contextMenus.create({"title": "Archive", "parentId": contextId, "onclick": openCached, "contexts":[context]});
	//To know if click was on on what link to go
	contextMap['google'].push(gCache)
	contextMap['archive'].push(aCache)
	//Map to know what type of menu item is linked with context
	contextMap[gCache] = context
	contextMap[aCache] = context
	
}