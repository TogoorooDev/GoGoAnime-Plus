(function () {

	var showData = {};
	var episodeData = {};

	async function syncData(){
		await chrome.storage.local.set({[showname]: showData});
	}

	async function chromeSet(keyvalobj) {
		return new Promise((resolve, reject) => {
			try{
				chrome.storage.local.set(keyvalobj, function(){
					resolve();
				})
			}catch (e){
				reject(e);
			}
		})
	}

	async function chromeGet(key) {
    	return new Promise((resolve, reject) => {
        	try {
            	chrome.storage.local.get(key, function (value) {
                	resolve(value);
            	})
        	}
        	catch (ex) {
            	reject(ex);
        	}
    	});
	}

	async function getShowData(){
		let seriesNameNode = document.querySelector('div.anime-info > a');
		let seriesName = seriesNameNode.href.match(/.*\.gogoanime.io\/category\/(.+)/)[1];
		// showData.series = seriesName;

		let episodeid = url.match(/.*\.gogoanime.io\/(.+)/)[1];
		// console.log(episodeid);

		let showbox = document.querySelector('div.anime-info > a');
		let showname = showbox.href.match(/.*\.gogoanime.io\/category\/(.+)/)[1];
		console.log(`Showname is: ${showname}`);
		// showData.episodeid = episodeid;

		showData = await chromeGet(showname);
		// console.log(showData[showname].title);

		// if (showData[showname].title == undefined){
		if (Object.entries(showData).length === 0){
			console.log('making new');
			showData.title = showname;
			showData.episodes = {};
			showData.episodes[episodeid] = {watched: false};
			console.log(showData);
			await chromeSet({[showname]: showData});
			showData = await chromeGet(showname);
			showData = showData[showname];
			console.log(showData);
		}else{
			showData = showData[showname];
			console.log('You should be all set!');
			console.log(showData);

		}
		if (!showData.episodes[episodeid]){
			showData.episodes[episodeid] = {watched: false};
			await chromeSet({[showname]: showData});
		}
		console.log(showData.episodes[episodeid]);

		episodeData = showData.episodes[episodeid];
	}

	function prepareNewData(){
		let seriesNameNode = document.querySelector('div.anime-info > a');
		let seriesName = seriesNameNode.href.match(/.*\.gogoanime.io\/category\/(.+)/)[1];
		let episodeid = url.match(/.*\.gogoanime.io\/(.+)/)[1];

		let newShowObj = {episodes: []};
		newShowObj.episodes[episodeid] = {watched: false};

		return newShowObj;
	}

	function fixSpellingError(){
		let typo = document.querySelector('div.anime_video_body > div:nth-of-type(5)');
		if (typo){
			typo.textContent = 'Please scroll down to select a server';
		}
	}

	function markTitle(){
		try{
			if (episodeData.watched){
				let title = document.querySelector('div.anime_video_body > h1');
				title.textContent = `(Watched) ${title.textContent}`;
			}
		}catch(e){
			console.error(`${e} found, nothing happening hopefully`);
		}
	}

	async function init(){
		await getShowData();
		markTitle();
		fixSpellingError();
	}

	const url = window.location.href;

	var watchpagetest = new RegExp(/.*gogoanime.io\/(?!(category))(?!(genre))(?!(.*\.html)).+/, 'gi');
	if (watchpagetest.test(url)){
		console.log('loaded watchpage.js, right page :)');
		init();
	}else{
		console.log('loaded watchpage.js, wrong page :(');
	}

})();