(function (){

	async function appendScore(){
			function addScore(malscore){
				console.log('Added score');
				//get proper place

				let existingP = Array.from(document.querySelectorAll('div.anime_info_body_bg > p'));

				let type;
				existingP.forEach((p) => {
					let text = p.textContent;
					if (text.includes('Type:')){
						type = p;
					}
				});

				console.log(type);

				let scp = document.createElement('p');
				scp.classList.add('type');
				scp.id = 'score-type';
				scp.innerHTML = `<span>Score:</span> <span id='score-color'>${malscore}</span>`;

				type.appendChild(scp);

				scp = document.getElementById('score-type');
				scorecolor = document.getElementById('score-color');

				if (malscore >= 8){

				}else if (malscore >= 6){
					scorecolor.style.color = 'white';
				}else{
					scorecolor.style.color = 'red';
				}

			}

		let disptitle = getDisplayTitle();
		let title = getTitle();

		let showobj = await getShowData();
		console.log(showobj);

		if (!showobj){
			console.log('making new');
			showobj = {};
			showobj.episodes = [];

			browser.storage.local.set({[title]: showobj});
		}

		if (!showobj.mal_id){
			console.log(disptitle);
			var data = await fetch(`https://api.jikan.moe/v3/search/anime?q=${disptitle}`);
			data = await data.json();
			id = await data.results[0].mal_id;

			showobj.mal_id = id;

			browser.storage.local.set({[title]: showobj});
		}

		var score = await fetch(`https://api.jikan.moe/v3/anime/${showobj.mal_id}`);
		score = await score.json();
		score = await score.score;

		addScore(score);

	}

	async function init(){
		appendScore();
	}

	init()
})()