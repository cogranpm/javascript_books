'use script';


var globalFred = "my name is: GlobalFred";

//direct assignment approach
var nm = {}

nm.console = null;
nm.functionVariable = null;

nm.getConsole = function(){
    if (this.console === null)
    {
	this.console = document.querySelector('#console');
    }
    return this.console;
}

nm.cpw = function(phrase)
{
    this.getConsole().value = '';
    this.pw(phrase);
}

nm.pw = function (phrase)
{
    this.getConsole().value +=  phrase;
}


nm.elementSelection = function(){
    const element = document.querySelector('#mainDiv');
    if(element != null)
    {
	this.cpw('Selected the div');
    }
}


nm.functionStuff = function(){
    this.functionVariable = this.sayGruff;
    this.functionVariable();
    this.pw('\n Put function in a variable and then executed the variable');
}

nm.sayGruff = function() {
    this.cpw("Gruff");
}

nm.mathStuff = function() {
    this.cpw('Doing Math Stuff\n');
    this.pw(`Math.pow(2, 2) = ${Math.pow(2,2)}\n`);
    this.pw(`Math.random() = ${Math.random()}\n`);
}

nm.dateStuff = function() {
    this.cpw('Doing Date Stuff\n');
    const today = new Date();
    this.pw(`Date: ${today.toLocaleDateString()}`);

}

nm.stringStuff = function() {
    this.cpw('Doing String Stuff\n');
    this.pw(`Major funcs: charAt, substring, slice, indexOf, lastIndexOf, split, replace, toUpperCase`);
    this.pw(`String.localeCompare() - "reggie" "reggie" ${"reggie".localeCompare("reggie")} \n`);
}

nm.regularExpressionIntro = function() {
    this.cpw('Regular Expressions\n');
    const someDigits = "1 2 3";
    const pattern = /\d+/g
    const someGone = someDigits.replace(pattern, '#');
    this.pw(`All digits in "1 2 3" converted to #: ${someGone} /\d+/g \n`);
    this.pw(`useful methods on strings that take regular expression arguments: search, match, replace, split \n`);
}

nm.undefinedAndNull = function(howdyParam) {
    let howdy;
    this.cpw(`variable declared and not initialized: ${howdy} \n`);
    this.pw(`parameter not supplied by caller: ${howdyParam} \n`);
    let retVal = this.noReturnVal();
    this.pw(`print value of function call with no return value ${retVal} \n`);
}

nm.noReturnVal = function() {
    this.pw('called noReturnVal function \n');
}

nm.casting = function() {
    this.cpw(`cast boolean to string String(false) ${String(false)} \n`);
    this.pw(`cast string to number Number("2") ${Number("2")} \n`);
    let n = 8.750;
    this.pw(`cast using the toString method on number ${n.toString()} \n`);
    this.pw(`format a number for display using toFixed() ${n.toFixed(2)} \n`);
    this.pw(`parseInt is surprising "3 blind mice" ${parseInt("3 blind mice")} \n`);
    this.pw(`parseFloat "50.5" ${parseFloat("50.5")} \n`);
}

nm.operators = function() {
    let myInstance = {name: 'fred', job: 'highlord', born: new Date(),  toString: function(){return "Name:"+ this.name + " job: " + this.job + " Born: " + this.born;} };


    this.cpw(`typeof can be if(typeof myVar == "string" or typeof(myVar) \n`);
    this.pw(`void \n`);
    this.pw(`instanceof \n`);
    this.pw(`in does myInstance:" ${myInstance.toString()}" have property job? ${'job' in myInstance}  \n`);
    this.pw(`delete removes a property from object ${delete myInstance.job} \n`);
    this.pw(`in does myInstance:" ${myInstance.toString()}" have property job now? ${'job' in myInstance}  \n`);
    this.pw(`strict equality inequality, no type conversions performed  === !== \n`);
}


    

function globals() {
    var global = this;
    nm.cpw(`global variable is property of the "Global Object" accessed like this.globalFred  ${this.globalFred} \n`);
    nm.pw(`eval - ${eval('"I am groot";')} \n`);
    nm.pw(`Math JSON etc are in global object \n`);
}

    


//module pattern approach
var mp = (function() {

    var id = 0;

    return {
	someFunc: function() {
	    return id++;
	},

	someOtherFunc: function() {
	    id = 0;
	},

	namespaces: function() {
	    nm.cpw(`Module Pattern - function wrapper returns an object containing public methods, invoked immediately, variables are private \n`);
	    nm.pw(`Object Literal - ${ol.myFormat()} \n`);
	    nm.pw(`Dynamic namespace - ${dn.myFormat()} \n`);
	}

    };
})();

//object literal approach
var ol = {
    myMember: 'fred',
    
    myFunc: function() {
	return this.myMember;
    },

    myFormat: function(){
	return 'I came from object literal namespace pattern, I am ' + this.myFunc();
    }
}

//dynamic namespacing
var dn = {};
(function(context) {
    var myMember = 'fred';

     context.myFormat = function(){
	return 'I came from dynamic namespace - pass namespace as argument to self invoking function ' + context.myFunc();
    }
    
    context.myFunc = function(){
	return myMember;
    }

   
})(dn);
