var consolewin = document.getElementById('windowList');
var submit = document.getElementById('exec');
var commandLine = document.getElementById('command-line');

var cmdhistory = new Array;
function updateConsole(e){
	let command = commandLine.value;
	cmdhistory.push(command);

	if (command == "clear()"){
		consolewin.innerHTML = '';
		console.log('DVC Clear');
		counter = 0;
		cmdhistory = [];
		return;
	}

	let newCommand = document.createElement('li');
	newCommand.classList.add('enteredCommand');
	newCommand.textContent = command;
	try{
		eval(command);
	}catch(e){
		console.log('ERROR: ', e);
		newCommand.classList.remove('enteredCommand');
		newCommand.classList.add('errorout');
		cmdhistory.pop();
	}

	commandLine.value = '';

	consolewin.appendChild(newCommand);
	// console.log(cmdhistory);
}
var counter = 0;
function handleKeypress(e){
	e.preventDefault()

	if (counter < 0){
		counter = 0;
	}
	//keyCode 38 = Up, keyCode 40 = Down, keyCode 13 = Enter
	// console.log(counter);

	/*if (event.keyCode === 13){
		//Enter Key (submit)
		counter = 0;
		submit.click();
	}else*/ if (e.keyCode === 38){
		//Up Button

		if (cmdhistory.length == 0){
			commandLine.value = '';
			return;
		}

		if (++counter > cmdhistory.length){
			counter = cmdhistory.length;
		}

		commandLine.value = cmdhistory[cmdhistory.length - counter];



	}else if (e.keyCode === 40){
		//Down Button

		if (cmdhistory.length == 0){
			commandLine.value = '';
			return;
		}

		if (--counter == 0){
			counter = 1;
			commandLine.value = '';
			return;
		}

		commandLine.value = cmdhistory[cmdhistory.length - counter]


	}
}

submit.addEventListener('click', updateConsole);

commandLine.addEventListener('keyup', handleKeypress);