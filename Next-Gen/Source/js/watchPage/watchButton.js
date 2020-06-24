(function(){

	const url = window.location.href;
	console.log('loaded watchButton.js');

	var showData = {};
	var episodeData = {};

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

	}

	async function markWatchStatus(stat){
		let showbox = document.querySelector('div.anime-info > a');
		showname = showbox.href.match(/.*\.gogoanime.io\/category\/(.+)/)[1];
		let episodeid = url.match(/.*\.gogoanime.io\/(.+)/)[1];

		showData.episodes[episodeid].watched = stat;

		await browser.storage.local.set({[showname]: showData});

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
		showData = await getShowData();
		// episodeData = getEpisodeDataFromShowData(showData);
		episodeData = await getEpisodeData();
		console.log(showData);
		appendWatchButton();
	}

	init();

})();