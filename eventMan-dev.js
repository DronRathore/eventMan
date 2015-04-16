/*
	Under Mozilla Public License V2.0
	Project: eventMan
*/
(function(ref){
	/* 
		Attaching it to the window
		Constructor
	*/
	ref.eventMan = eventMan = function(){
		if (this instanceof eventMan){
			if (ref.___currentUniqueID == undefined)
				ref.___currentUniqueID = 0;
			return this;
		} else {
			new eventMan();
		}
	}
	/*
		The object which keeps all of the listeners list
		{
			node_id	: {
				"eventName" : [Array_List_Of_Callbacks]
			}
		}
	*/
	eventMan.prototype.list = {};
	/*
		A simple hack to generate unique IDs
	*/
	eventMan.prototype.getUniqueID = function(element){
		if (element.uniqueID)
			return element.uniqueID
		else
			element.uniqueID = ++ref.___currentUniqueID;
		return element.uniqueID;
	}
	/*
		Add a listener to the list
	*/
	eventMan.prototype.addToMap = function(ID, eventType, element, callback){
		// Create a map if it doesn't exits
		if (ID && this.list[ID] == undefined){
			this.list[ID] = {
				el: element,
				_callbacks: {}
			};
			this.list[ID]._callbacks[eventType] = [callback];
		} else {
			this.list[ID]._callbacks[eventType] = this.list[ID]._callbacks[eventType] ? this.list[ID]._callbacks[eventType] : [];
			this.list[ID]._callbacks[eventType].push(callback);
		}
	}
	/*
		Core: An exposed helper which helps you bind the events
		eventMane.attachEvent(DOM_NODE, eventType, callback)
	*/
	eventMan.prototype.attachEvent = function(element, eventType, callback){
		var ID		= !element.length?this.getUniqueID(element): false;
		var self	= this;
		var el 		= element == window ? window : document.body;
		if (!ID){
			/*
				We have an array of elements!
				May be a $ selector output! Kewl!
			*/
			var length = element.length;
			for (var i=0;i<length;i++){
				var currentElement = element[i];
				// Those Dirty jQuery Objects are not meant to be here
				if (currentElement.ATTRIBUTE_NODE){
					var ID = this.getUniqueID(currentElement);
					this.addToMap(ID, eventType, currentElement, callback);
				}
			}
		} else {
			this.addToMap(ID, eventType, element, callback);
		}
		return this.addEventListener(element, el, eventType);
	};
	/*
		ToDo: Not sure if blur, focus is fixed after the capture update.
		Previously, I can't capture these events if I was listening on top level.
	*/
	eventMan.prototype.addEventListener = function(originalElement, el, eventType){
		var self = this;
		var originalElement = originalElement;
		if (eventType == "focus" || eventType == "blur")
			var el = originalElement;
		// We attach a property to just to not to access the Map
		if (el["__"+eventType] == null){
			el["__"+eventType] = true
			if (el["addEventListener"]){
				return el.addEventListener(eventType, function(event){
					if (event["stopPropagation"]){
						// We don't want our event to go further
						event.stopPropagation()
					}
					if (originalElement == window){
						var ID 		= window.uniqueID;
						var element = window;
					} else {
						var element = event.srcElement ? event.srcElement: event.target;
						var ID 		= element.uniqueID;
					}
					if (ID && self.list[ID] && self.list[ID]._callbacks[eventType]){
						var callbacks 	= self.list[ID]._callbacks[eventType];
						self.fireMan(element, event, callbacks);
						// ToDo: Handle Bubbling Now
					}
				}, true)
			} else {
				// ToDo: Fallback for attachEvent
			}
        }
	}
	/*
		He is Dumb, don't bother about him!
	*/
	eventMan.prototype.fireMan = function(element, event, callbacks){
		var length = callbacks.length;
		for (var i=0;i<length;i++)
			(function(element, event){
				callbacks[i](element, event);
			})(element, event);
	}
	// Lets be nice to add a jquery plugin
	// HashTag: Later on :P
})(window);
