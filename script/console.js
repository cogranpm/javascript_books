/* console module. provides printing and so forth */
var cs = {};

(function(cx) {

    let console = null;

    cx.getConsole = function(){
        if (console === null)
        {
         console = document.querySelector('#console');
        }
        return console;
    }
    
    cx.cpw = function(phrase)
    {
        this.getConsole().value = '';
        this.pw(phrase);
    }
    
    cx.pw = function (phrase)
    {
        this.getConsole().value +=  phrase;
    }

})(cs);
