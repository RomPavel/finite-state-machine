class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
	if(typeof(config)=='undefined') throw new Error;
	else 
	this.config=config;
	this.stat=this.config.initial;
	
	this.und = new Array;
	this.red = new Array;
	
	}

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
	return this.stat;
	}

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
	if(state in this.config.states)  {this.und.push(this.stat); this.stat=state;}
	else 
	throw new Error;
	}

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
	if(event in this.config.states[this.stat].transitions)
		{
		if(this.und[this.und.length-1]!=this.stat)
		  this.und.push(this.stat);
		  
		  this.stat=this.config.states[this.stat].transitions[event];
        }
	else 
	  throw new Error;
	}

	
    /**
     * Resets FSM state to initial.
     */
    reset() {
	this.stat=this.config.initial;
	}

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
	var arr = new Array;
	
	if(typeof(event)=='undefined')
	  {
	    for(var index in this.config.states )
	        arr.push(index);
	  }

	else 
	  {
	    for(var index in this.config.states )
		  {
	        if(event in this.config.states[index].transitions)
	        arr.push(index);
		  }
	  }
		
		
    return arr;
	}

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
	if(this.stat==this.config.initial) {return false}
	if(this.und.length!=0) 
	  { 
	    if(this.red[this.und.length-1]!=this.stat)
		  this.red.push(this.stat);
		  
		  this.stat=this.und.pop(); 
		  return true;
	  }
	else return false;
	
	
	}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
	if(this.stat==this.config.initial&&this.red.length==0) {return false;}
	if(this.red.length!=0) {this.stat=this.red.pop(); return true;}
	else return false;
	}

    /**
     * Clears transition history
     */
    clearHistory() {
	this.und.length=0;
	this.red.length=0;
	}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
