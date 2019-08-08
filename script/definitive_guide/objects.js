//declare the namespace
var oo = {}

//console is a place to write output
oo.console = null;

//returns the dom element where we can write stuff
oo.getConsole = function(){
    if (this.console === null)
    {
	this.console = document.querySelector('#console');
    }
    return this.console;
}

//clear then print
oo.cpw = function(phrase)
{
    this.getConsole().value = '';
    this.pw(phrase);
}

//print without clearning first
oo.pw = function (phrase)
{
    this.getConsole().value +=  phrase;
}

oo.pl = function(phrase)
{
    this.pw(phrase)
    this.pw('\n')
}

oo.basics = function()
{
    this.pl("Object basics")
    this.pl(
`inherits properties of another object, it's prototype 
properties have attributes:
writeable - can be set?
enumerable - returned by for/in loop
configurable - can be deleted, or attributes altered
`)

this.pl(`
each object has 3 object attributes:
prototype: reference to another object from which properties are copied
class: string that categorizes type of an object
extensible flag: specifies whether new properties may be added to object`)

this.pl(`
categroies of javascript objects:
native: defined by ECMAScript, eg Arrays, functions, dates, regular expressions
host: defined by host environment, such as browser
user defined: created by execution of javascript code`)
}


oo.creation = function() {
    
    this.literalstyle()
    this.newobjectstyle()

    const demo = {
        "title": "demo",
        name: "ademo",
        subObject: {
            subname: "fred",
            subtitle: "a fred"
        },
        toString: function(){
            return "key : value,  pairs inside { } can have functions too"
        }
    };
    let proto = Object.create({myDate: new Date()});
    const created = Object.create({name: "Roy", toString: function() {return "Object.create({name:value}"}});
    const basedOnProto = Object.create(proto);
    function oldStyleProto () {};
    const dob = {"dob": new Date()};
    oldStyleProto.prototype = dob;
    this.pl(`object literals: ${demo.toString()} \n`);
    this.pl(`Object.create() ${created.toString()} \n`);
    this.pl(`Objec.create(proto) ${basedOnProto.myDate.toString()} \n`);
    this.pl(`manually set prototype ${new oldStyleProto().dob.toString()} \n`);
}

oo.literalstyle = function() {
    this.pl(`
object literal style: 
var x = {}    
var x = {x:0, y:0}
var x ={ "first Name": "fred", "age": 27, address: { addr1: "messy place"}}
    `)

    let x = {"first name": "peter", lastname: "smith", address: { addr1: "messy place"}}
    this.pl(x["first name"])
    this.pl(x.lastname)
    this.pl(x.address.addr1)

}

oo.newobjectstyle = function() {
    this.pl(`
using the new operator: var x = new Object().. Array()..Date()..RegExp("xx")
`)    
}