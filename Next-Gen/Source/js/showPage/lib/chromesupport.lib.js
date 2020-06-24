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