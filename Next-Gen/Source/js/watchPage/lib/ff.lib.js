async function getShowData(){
	let showData = {};
	let url = window.location.href;

	let seriesNameNode = document.querySelector('div.anime-info > a');
	let seriesName = seriesNameNode.href.match(/.*\.gogoanime.io\/category\/(.+)/)[1];
	// showData.series = seriesName;

	let episodeid = url.match(/.*\.gogoanime.io\/(.+)/)[1];
	// console.log(episodeid);

	let showbox = document.querySelector('div.anime-info > a');
	let showname = showbox.href.match(/.*\.gogoanime.io\/category\/(.+)/)[1];
	console.log(showname);
	// showData.episodeid = episodeid;

	showData = await browser.storage.local.get(showname);
	// console.log(showData[showname].title);

	// if (showData[showname].title == undefined){
	if (Object.entries(showData).length === 0){
		console.log('making new');
		showData.title = showname;
		showData.episodes = {};
		showData.episodes[episodeid] = {watched: false};
		console.log(showData);
		await browser.storage.local.set({[showname]: showData});
		showData = await browser.storage.local.get(showname);
		showData = showData[showname];
		console.log(showData);
	}else{
		showData = showData[showname];
		console.log('You should be all set!');
		console.log(showData);

	}
	if (!showData.episodes[episodeid]){
		showData.episodes[episodeid] = {watched: false};
		await browser.storage.local.set({[showname]: showData});
	}

	console.log(showData.episodes[episodeid]);

	return showData;
}

function getEpisodeDataFromShowData(showData){
	let showbox = document.querySelector('div.anime-info > a');
	let showname = showbox.href.match(/.*\.gogoanime.io\/category\/(.+)/)[1];

	return showdata.episodes[showname];
}

async function getEpisodeData(){
	let showData = {};
	let url = window.location.href;

	let seriesNameNode = document.querySelector('div.anime-info > a');
	let seriesName = seriesNameNode.href.match(/.*\.gogoanime.io\/category\/(.+)/)[1];
	// showData.series = seriesName;

	let episodeid = url.match(/.*\.gogoanime.io\/(.+)/)[1];
	// console.log(episodeid);

	let showbox = document.querySelector('div.anime-info > a');
	let showname = showbox.href.match(/.*\.gogoanime.io\/category\/(.+)/)[1];
	console.log(showname);
	// showData.episodeid = episodeid;

	showData = await browser.storage.local.get(showname);
	// console.log(showData[showname].title);

	// if (showData[showname].title == undefined){
	if (Object.entries(showData).length === 0){
		console.log('making new');
		showData.title = showname;
		showData.episodes = {};
		showData.episodes[episodeid] = {watched: false};
		console.log(showData);
		await browser.storage.local.set({[showname]: showData});
		showData = await browser.storage.local.get(showname);
		showData = showData[showname];
		console.log(showData);
	}else{
		showData = showData[showname];
		console.log('You should be all set!');
		console.log(showData);

	}
	if (!showData.episodes[episodeid]){
		showData.episodes[episodeid] = {watched: false};
		await browser.storage.local.set({[showname]: showData});
	}

	console.log(showData.episodes[episodeid]);

	return showData.episodes[episodeid];
}