eventMan
========

A Simple and fast Event Handler.
####Under Mozilla Public License
For time I was searching the answer for global event listeners which are efficient, fast and works without glitch.
```eventMan``` binds all of the listener at the root level, Oh yeah you heard me right, it listen everything on ```document.body``` 

So there is no way you are going to get messed up. Is it X-Browser compatible? Hell Yeah!
```eventMan``` uses the default "oneventName" properties to attach event listeners.

##Why I did this?
So long of coding history of mine, people were using ```jQuery``` to address their Event Handling issues but with time their code grew complex, less optimized.
For me to use it on a webpage having thousands of event listeners causes glitches, delays and it should because ```addEventListener``` is bit slow if you compare with ```element.onSomeEventName``` and the way jQuery handles it is bit typical.

##Goals?
To solve the issue of eventHandling of the common man in modern Web Development Era!(Oh what did I just say) #IYKWIM

##Whats the level of eventMan?
Well it can listen on Objects having property ```target```, so Objects of your Model having ```@target = @model``` will work.
But as of now I consider it as just a KinderGarten enabled library, lot to be added, lot to be addressed and optimized with time.

##Can I Contribute?
There is no way I can stop your evil coding mind to not to contribute! Go on Baby! Throw some Pull request, raise some issues. Together We Can!

###Cheers!
