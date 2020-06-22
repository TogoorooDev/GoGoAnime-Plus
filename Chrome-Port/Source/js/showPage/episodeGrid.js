(function(){
	console.log('loaded episodeGrid.js');

	var showData = {};
	var seriesData;
	var url = window.location.href;
	// var episodeData = {};

	function getWatchedStatus(episodeid){

		// console.log(`Getting watch status for show ${episodeid}`);

		console.log(episodeid);

		if(!showData.episodes.hasOwnProperty(episodeid)){
			return false
		};

		let stat = showData.episodes[episodeid].watched;
		return stat;
	}

	async function fillInShowData(){
		// let seriesNameNode = document.querySelector('div.anime-info > a');
		let seriesName = url.match(/.*\.gogoanime.io\/category\/(.+)/)[1];
		// showData.series = seriesName;
		// console.log(episodeid);

		let showbox = document.querySelector('div.anime-info > a');
		let showname = url.match(/.*\.gogoanime.io\/category\/(.+)/)[1];
		console.log(showname);
		// showData.episodeid = episodeid;

		showData = await chrome.storage.local.get(showname);
		// console.log(showData[showname].title);

		// if (showData[showname].title == undefined){
		/*if (Object.entries(showData).length === 0){
			console.log('making new');
			showData.title = showname;
			showData.episodes = {};
			showData.episodes[episodeid] = {watched: false};
			console.log(showData);
			await chrome.storage.local.set({[showname]: showData});
			showData = await chrome.storage.local.get(showname);
			showData = showData[showname];
			console.log(showData);
		}else{*/
		showData = showData[showname];
		console.log('You should be all set!');
		console.log(showData);

		//}
	}	


	async function eginit(){
		await fillInShowData();
		
		var ulint = setInterval(modifyGrid, 100);

		function modifyGrid(){
			let ul = document.getElementById('episode_related');
			if (!ul){
				return;
			}
			clearInterval(ulint);
			let lis = Array.from(ul.childNodes);
			lis.forEach((li) => {
				let a = li.firstChild;
				let epid = a.href.match(/.*\.gogoanime.io\/(.+)/)[1];
				let watched = getWatchedStatus(epid);

				if (watched){
					let name = a.querySelector('div.name');
					name.textContent = `*${name.textContent}*`;
				}
			});


		}
	}
	
	eginit();
})();