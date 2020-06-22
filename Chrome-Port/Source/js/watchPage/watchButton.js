(function(){

	const url = window.location.href;
	console.log('loaded watchButton.js');

	var showData = {};
	var episodeData = {};

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


	async function fillInShowData(){
		let seriesNameNode = document.querySelector('div.anime-info > a');
		let seriesName = seriesNameNode.href.match(/.*\.gogoanime.io\/category\/(.+)/)[1];
		// showData.series = seriesName;

		let episodeid = url.match(/.*\.gogoanime.io\/(.+)/)[1];
		// console.log(episodeid);

		let showbox = document.querySelector('div.anime-info > a');
		let showname = showbox.href.match(/.*\.gogoanime.io\/category\/(.+)/)[1];
		console.log(showname);
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

	function wb_onclick(e){
		e.preventDefault();
		console.log('clicked!');
		let title = document.querySelector('div.anime_video_body > h1');
		if (episodeData.watched){
			markWatchStatus(false).then((d) => {
				console.log(`Updated! ${d}`);
			});

			title.textContent = title.textContent.replace('(Watched)', '').trim();
			this.firstChild.textContent = 'Mark as Watched';

		}else if (!episodeData.watched){
			markWatchStatus(true).then((d) => {
				console.log(`Updated! ${d}`);
			});

			title.textContent = `(Watched) ${title.textContent}`;
			this.firstChild.textContent = 'Mark as Unwatched';
		}

		eginit();
	}

	async function markWatchStatus(stat){
		let showbox = document.querySelector('div.anime-info > a');
		showname = showbox.href.match(/.*\.gogoanime.io\/category\/(.+)/)[1];
		let episodeid = url.match(/.*\.gogoanime.io\/(.+)/)[1];

		showData.episodes[episodeid].watched = stat;

		await chrome.storage.local.set({[showname]: showData});


		return 1;
	}

	function appendWatchButton(){
		let watched;
		if (!episodeData.watched){
			watched = false
		}else{
			watched = episodeData.watched;
		}
		console.log('appending watch button');
		let parent = document.querySelector('div.anime_video_body_cate');
		let buttona = document.createElement('a');
		buttona.href = '#';
		buttona.addEventListener('click', wb_onclick);
		buttona.id = 'buttonlink';
		parent.appendChild(buttona);
		buttona = document.getElementById('buttonlink');

		let buttonspan = document.createElement('span');
		buttonspan.classList.add('btndownload');
		if (watched){
			buttonspan.textContent = 'Mark as Unwatched';
		}else{
			buttonspan.textContent = 'Mark as Watched';
		}
		buttonspan.style.marginLeft = '0.8em';
		buttona.appendChild(buttonspan);
	}

	async function init(){
		await fillInShowData();
		appendWatchButton();
	}

	init();

})();