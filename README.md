# UI-Conponent-WebWorker
A very simple JS Lib to use WebWorkers for UI component.
Very hacky and prototype now.

Small Demo:
http://philipp-grulich.de/playground/ui-webworker/

The Idea:
![alt text](http://www.gliffy.com/go/publish/image/7372263/L.png)


Index.html

```html

<!DOCTYPE html>
<html>
<body>
<div>
    <div text> Counter {{a}}</div>
    <div pi> Pi Calculation {{round}} : {{pi}}</div>
</div>
<script type="text/javascript" src="lib.js"></script>
<script  type="text/javascript" src="app.js"></script>

</body>
</html>
```

app.js

```javascript
var lib = new Lib();
// just tow components
lib.component("text", function (scope) {
    scope.a = 1;
    setInterval(function () {
        scope.a++;
        update();
    },500)

});
// calculating PI
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


```
