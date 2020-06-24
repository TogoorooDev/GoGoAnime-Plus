(function () {

	var episodeData;

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
		episodeData = await getEpisodeData();
		console.log(await getShowData());
		markTitle();
		fixSpellingError();
		test();
	}

	const url = window.location.href;

	var watchpagetest = new RegExp(/.*gogoanime.io\/(?!(category))(?!(genre))(?!(.*\.html)).+/, 'gi');
	if (watchpagetest.test(url)){
		init();
		console.log('loaded watchpage.js, right page (/≧▽≦)/');
	}else{
		console.log('loaded watchpage.js, wrong page .·´¯`(>▂<)´¯`·. ');
	}

})();