Lib = function(){
    this.components = {};
    this.elementScopes = [];
    var self = this;
    //Simple Gui update loop to get ~50FPS
    setInterval(function(){
        self.elementScopes.forEach(function(element){
            self.evalDom(element)
        });

    },50)

};


Lib.prototype.component = function(name,component){
    this.components[name] = {func: component};
    this.parseDom();
};

//Create a new Webworker and manage the communication
Lib.prototype.$$startWorker = function(worker,scopeElement){


    function setupOnMessage() {
        this.scope;
        this.update = function(){
            self.postMessage(scope);
        };


        onmessage = function(e) {
            if (e.data.type == '__args') {
                console.log(e.data.args);
                this.scope = e.data.args[0];
                __func.apply(this, e.data.args)
            }
        }
    }

    var funcString;

    var blob = new Blob([
        "var __func = " + worker.toString() + ";\n" +
        "(" + setupOnMessage.toString() + ").call(this);"
    ], { type: 'application/javascript' } );

    var urlObject = URL.createObjectURL(blob);
    var worker = new Worker(urlObject);

    worker.postMessage({
        type: '__args',
        args: [scopeElement.scope]
    });

    worker.onmessage = function(e) {
        console.log("Received: " + e.data);
        scopeElement.scope = e.data;
    };
};

Lib.prototype.evalDom = function(elementScopes){
   var htmlString =  elementScopes.shadowHtml;
    for(var props in elementScopes.scope) {
        var find = '{{'+props+'}}';
        var re = new RegExp(find, 'g');

        htmlString = htmlString.replace(re, elementScopes.scope[props]);
    }

    elementScopes.element.innerHTML = htmlString;
};

Lib.prototype.parseDom = function() {
    for (var component in this.components) {
        var elements = document.querySelectorAll("div[" + component + "]");
        var componentObject = this.components[component];
        for(var i = 0 ;i< elements.length;i++){
            var element = elements[i];
            var scopeElement = {
                "name": component,
                "scope":{},
                "element":element,
                "shadowHtml":element.innerHTML
            };


            this.elementScopes.push(scopeElement);

            this.$$startWorker(componentObject.func, scopeElement);
        };
    };

};





