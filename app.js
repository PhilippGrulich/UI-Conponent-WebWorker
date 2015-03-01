var lib = new Lib();

lib.component("text", function (scope) {
    scope.a = 1;
    setInterval(function () {
        scope.a++;
        update();

    },500)

});


lib.component("pi", function (scope) {
    function pi(i){
        var c = i;
        var Pi=0;
        var n=1;
        for (i=0;i<=c;i++)
        {
            Pi=Pi+(4/n)-(4/(n+2))
            n=n+4
        }
        return Pi;
    }
    for(var i = 100000000 ; i<1000000000000;i++){
        console.log(i);
        scope.round = i;
        scope.pi = pi(i);
        update();
    }
});

lib.component("pi2", function (scope) {
    function pi(i){
        var c = i;
        var Pi=0;
        var n=1;
        for (i=0;i<=c;i++)
        {
            Pi=Pi+(4/n)-(4/(n+2))
            n=n+4
        }
        return Pi;
    }
    for(var i = 5000 ; i<1000000000000;i++){
        console.log(i);
        scope.round = i;
        scope.pi = pi(i);
        update();
    }
});

