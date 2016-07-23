var cols = 19;
for(i = cols*cols;i--;){
    var child = document.createElement("div");
    child.setAttribute("class", "item");
    child.textContent = (cols*cols-i);
    grid.appendChild(child);
}

const d = document
const count = d.querySelectorAll('.item').length
const sqrCount = Math.sqrt(count);
const num = (x) => d.querySelectorAll('.item')[x-1]
const setNum = (x,cl) => num(x).setAttribute("class", "item "+(cl||""));
const isOff = (x) => x<1 || x>count || num(x).getAttribute("class").indexOf("off") > -1;
let timer = -1;

setNum(1, "off")
setNum(2, "sel")

let cursor = 2;

const turnOff = (cursor, callback) => {
	let pos = cursor*cursor;
	const step = ()=> {
		setNum(pos, "off");
		pos += cursor;
		if (pos <= count) {
			timer = setTimeout(step, 25);
		} else {
			callback();
		}
	}
	step();
}

const finish=() =>{
	for (let i = 1; i <= count; i++) {
		if (!isOff(i)) setNum(i, "prime");
	}
}



const loop = () => {
	setNum(cursor, "sel")
	turnOff(cursor, () => {
		setNum(cursor)
		cursor++
		while(isOff(cursor)) cursor++
		if (cursor <= sqrCount) {
			timer = setTimeout(loop, 1000)
		} else {
			finish()
		}
	})
}

const reset = () => {
	for (let i = 1; i <= count; i++) {
		setNum(i, "")
	}
	if (timer>-1) {
		clearTimeout(timer)
		timer = -1;
	}
	cursor = 2;
	timer = setTimeout(() => {
		setNum(1,"off");
		timer = setTimeout(loop, 2000)
	}, 2000);
}

loop()
window.onclick = reset