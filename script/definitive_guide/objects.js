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
    this.cpw("")
    this.literalstyle()
    this.newobjectstyle()
    this.prototypestyle()
    
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
}

oo.literalstyle = function() {
    this.pl(`
object literal style: 
var x = {}    
var x = {x:0, y:0}
var x ={ "first Name": "fred", "age": 27, address: { addr1: "messy place"}, toString: function() { return "something"}}
    `)

    let x = {"first name": "peter", lastname: "smith", address: { addr1: "messy place"}, toString: function() {return "hello"} }
    this.pl(x["first name"])
    this.pl(x.lastname)
    this.pl(x.address.addr1)
    this.pl(x.toString())

}

oo.newobjectstyle = function() {
    this.pl(`
using the new operator: var x = new Object().. Array()..Date()..RegExp("xx")
`)    
}

oo.prototypestyle = function() {
    this.pl(
`
every javascript object has a second object associated with it, its properties are inherited
all objects created by object literals have the prototype Object.prototype
objects created via keyword new use value of prototype property of the constructor function: eg
new Object() - prototype is Object.prototype, new Date() used Date.prototype etc
a prototype chain describes how each object prototype may inherit from another
Object.create(), creates new object, using first argument as prototype of that object, there is an optional
second argument that describes properties of the new object
for example: let o = Object.create({x:1, y:2}), object inherits properties x and y   
if you want the default pass Object.prototype as the argument, you can create an heir for any object you create   
`
            )
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

oo.querying = function() {
    this.cpw("Querying and Setting Properties")
    this.pl(
`
use . or [] notation to get at an object's property, goes for setting as well
you can do stuff like using [expression] to create properties at runtime
the [] braces make property identifiers dynamic, . identifiers are static (hardcoded)

explaining inheritence
if you query a property x in object o, if o does not have a property x, it's prototype is queried
then the prototype of the prototype and so on
if you assign a value to property x on object o, and it doesn't have it, a property will be created   
if a prototype does have an x property, it will be hidden by the x created on the object, unless
the inherited property is read only, then the assignment will fail, Note that this is important
it won't call the setter on the inherited x, if it has one, it will instead create a new property 
on the object, which is different from reading a property, which will look through the inheritence chain
There is an exception if x is inherited, and x is an accessor property with a setter method, the setter method
in the prototype will be called, and no new property created on the object, accessor properties are a different topic
Here is an example:
var o = {
    data_prop: value,
    get accessor_prop() { return something },
    set accessor_prop(value) { set something }
    }
    
//contrived example    
let p = {
    x: 1.0,
    y: 1.0,
    
    //r is a read-write accessor property
    get r() { return 2 + 2 * this.x },
    set r(newValue) { 
      this.x = newValue / 2;
      this.y = newValue / 4;
    }
    //read only property would only have a get
}
    
you can query property of object that doesn't exist, returns undefined
imagine you query a property you think is a string, but doesn't exist
book.subtitle, will return undefined, if you try:
book.subtitle.length you will get an error, undefined has no properties
you can guard this with an if, if (book.subtitle) len = book.subtitle.length
fancy way to do this is use the && short circuit
let len = book && book.subtitle && book.subtitle.length    
    
you can use delete to delete properties, such as delete book.title

you can test for existence of property in an object using:
"x" in o - also check inheritence chain
o.hasOwnProperty("x") - does not check inheritence chain
o.propertyIsEnumerable("x") - does not check inheritence chain
o.x !== undefined
    
Enumerating Properties
let o = (x:0, y:0, z:0}
for(prop in o){
    console.log(prop)
}

and with a guard in place
for(prop in o){
 if(typeof o[p] === "function") continue;
 //do something with p here
}
`
            )
}        