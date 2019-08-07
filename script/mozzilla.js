//dynamic namespacing
var nm = {};
(function(context) {
    let console = null;

    context.getConsole = function(){
        if (console === null)
        {
         console = document.querySelector('#console');
        }
        return console;
    }
    
    context.cpw = function(phrase)
    {
        this.getConsole().value = '';
        this.pw(phrase);
    }
    
    context.pw = function (phrase)
    {
        this.getConsole().value +=  phrase;
    }

    context.sdObjects = function()
    {
        this.cpw(`standard objects: \n`);
    }

    context.globalFunc = function()
    {
        const uri = "https://mozilla.org/?x=шеллы";
        this.cpw(`eval isFinite, isNaN, parseFloat, parseInt \n`);
        this.pw(`uri= ${uri} \nencodeURI = ${encodeURI(uri)}\ndecodeURI = ${decodeURI(encodeURI(uri))} \n`);
        this.pw(`decodeURIComponent() encodeURIComponent() \n`);
    }

    context.fundamentalObjects = function()
    {
        this.cpw(`Object, Function, Boolean, Symbol, Error, EvalError, InternalError RangeError, ReferenceError, SyntaxError, TypeError, URIError \n`);
    }

    context.strings = function()
    {
        this.cpw(`concat, includes, slice, trim \n`);
    }

    context.international = function()
    {
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        this.cpw(`England Date Time: ${new Intl.DateTimeFormat('en-GB', options).format(new Date())}  \n`);
        this.pw(`Yank Date Time: ${new Intl.DateTimeFormat('en-US', options).format(new Date())}  \n`);
        this.pw(`Arabic Date Time: ${new Intl.DateTimeFormat('ar-EG', options).format(new Date())}  \n`);
        options = {
            hour: 'numeric', minute: 'numeric', second: 'numeric', 
            timeZone: 'Australia/Sydney',
            timeZoneName: 'short'
          };
          this.pw(`Sydney Timezone: ${new Intl.DateTimeFormat('en-AU', options).format(new Date())}  \n`);
          options = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: false,
            timeZone: 'America/Los_Angeles' 
          };
          this.pw(`Los Angelese Timezone: ${new Intl.DateTimeFormat('en-US', options).format(new Date())}  \n`);
    }

    context.indexedCollections = function()
    {
	const arr = ['Hawks', 'Bombers', 'Tigers'];
	this.cpw(`forEach demo \n`);
	arr.forEach(function(team){
	    //note here inside lambda, this cannot be used to access the context
	   context.pw(`team name: ${team} \n`);
	});
	this.pw(`fat arrow style for each arr.forEach(team => something) \n`);
	//note fat arrow style "this" is available ie this.pw(
	arr.forEach(team => this.pw(`team name: ${team} \n`));
	this.pw(`Array ${arr} First=${arr[0]} set length to 0 to empty array ${arr.length = 0} ${arr} \n`);
	this.pw(`concat(), join(','), push(), pop(), shift(), unshift(), slice(start, end), splice(start, count, element, element), reverse(), sort() \n`);
	const tennis = ['Michael Chang', 'Pete Sampras', 'Martina Navratalova', 'Pat Cash'];
	const balls = ['wicket', 'no ball', 'wide', 'leg byes', 'dot', 'byes'];
	this.pw(`array- tennis: ${tennis.join(' - ')} \n`);
	const cricketAndTennis = tennis.concat(balls);
	this.pw(`concat = tennis and cricket: ${cricketAndTennis.join(' - ')} \n`);
	let newLength = balls.push('dead ball');
	this.pw(`pushed dead ball: ${balls.join(' - ')} \n`);
	let deadBall = balls.pop();
	this.pw(`popped off dead ball: ${balls.join(' - ')} \n`);
	let wicket = balls.shift();
	this.pw(`shifted off wicket: ${balls.join(' - ')} \n`);
	newLength = balls.unshift('wicket');
	this.pw(`unshifted wicket back in: ${balls.join(' - ')} \n`);
	balls.reverse();
	this.pw(`reversed the balls: ${balls.join(' - ')} \n`);
	balls.sort();
	this.pw(`sorted the balls: ${balls.join(' - ')} \n`);
	let weirdSort = function(a, b) {
	    if(a === 'Pat Cash' || b === 'Pat Cash')
	    {
		return 1;
	    }
	    else
	    {
		if(a < b){
		    return -1;
		}
		else if(a > b){
		    return 1;
		}
		else if(a === b)
		{
		    return 0;
		}
	    }
	}
	tennis.sort(weirdSort);
	this.pw(`sort pat cash #1 ${tennis.join(' - ')} \n`);
	this.pw(`search with indexOf(), does array contain boris becker? ${tennis.indexOf('boris becker')} \n`);
	this.pw(`search with indexOf(), does array contain pete sampras? ${tennis.indexOf('pete sampras')} \n`);
	this.pw(`search with indexOf(), does array contain Pete Sampras? ${tennis.indexOf('Pete Sampras')} \n`);		
    
    //map
    this.pw(`Map: returns new array from executing callback on every array item \n`);
    this.pw(`We'll add prefix : to all items, ${tennis.map( function(item) { return ":" + item;}).join(" - ")}\n`);
    this.pw(`Filter, returns item in new array if callback == true ${tennis.filter(function(item) { return (item.indexOf("Sampras") > 0);} ).join("-")}\n`);
    this.pw(`every returns true if callback returns true for every item - ie includes a in name ${tennis.every(function(item){return item.includes("a")})} \n`);
    this.pw(`some: similar to every`);
    this.pw(`reduce: iteratively applies the function to each element pair in array and returns a single value which is sum of all return values `);
    this.pw(`example concatenate with a seperator ${tennis.reduce(function(one, two){return one + ":" + two + ""}, "begin")}\n`);
    this.pw(`lets do it from the right: ${tennis.reduceRight(function(one, two){return one + "!" + two + ""})}\n`);

    //multi dimensional arrays
    const myGrid = [[1,2,3,4,5,6], [6,5,4,3,2,1]];
    this.pw(`Multi D Array - Grid position 0,3 is ${myGrid[0][3]} Grid position 1,3 is ${myGrid[1][3]}\n`);

    //arrays can grow
    let myArr = [0];
    this.pw(`counting from 0 to 5 \n`);
    for(let i = 0; i < 6; i++)
    {
        this.pw(`:${myArr[i]}\n`);
        myArr.push(i + 1);
    }

    //typed arrays
    this.pw(`typed arrays let you access binrary data directly - used on stuff like video \n`);

    
    }

   
})(nm);
