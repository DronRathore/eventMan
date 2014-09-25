(function(ref){
	ref.eventMan = eventMan = function(){
		if (this instanceof eventMan){
			if (ref.___currentUniqueID == undefined)
				ref.___currentUniqueID = 0;
			return this;
		} else {
			new eventMan();
		}
	}
	eventMan.prototype.list = {};
	eventMan.prototype.getUniqueID = function(element){
		if (element.uniqueID)
			return element.uniqueID
		else
			element.uniqueID = ++ref.___currentUniqueID;
		return element.uniqueID;
	}
	eventMan.prototype.attachEvent = function(element, eventType, callback){
		var ID		= this.getUniqueID(element);
		var self	= this;
		// Create a map if it doesn't exits
		if (this.list[ID] == undefined){
			this.list[ID] = {
				el: element,
				_callbacks: {}
			};
			this.list[ID]._callbacks[eventType] = [callback];
		} else {
			this.list[ID]._callbacks[eventType] = this.list[ID]._callbacks[eventType] ? this.list[ID]._callbacks[eventType] : [];
			this.list[ID]._callbacks[eventType].push(callback);
		}
		if (document.body["on"+eventType] == null){
			document.body["on"+eventType] = function(event){
				var element 	= event.srcElement ? event.srcElement: event.target;
				var ID = element.uniqueID;
				if (ID && self.list[ID] && self.list[ID]._callbacks[eventType]){
					var callbacks 	= self.list[ID]._callbacks[eventType];
					self.fireMan(element, event, callbacks);
				}
			}
        }
	};
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