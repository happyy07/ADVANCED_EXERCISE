/*
The State class represents a state in a Finite State Machine (FSM). 
It has the following properties:
name: A string that identifies the state.
value: A value that can be associated with the state.
initialState: A boolean that indicates whether the state is the initial state of the FSM.
finalState: A boolean that indicates whether the state is a final state of the FSM.
*/

export default class State {
    //constructor
    //Default value of initialState and finalState is false
	constructor({name,value,initialState=false,finalState=false}) {
		this.name = name;
		this.value = value;
        this.initialState=initialState
        this.finalState=finalState
	}

    //Returns the name of the state.
    getName(){
        return this.name
    }

    //Returns the value associated with the state.
    getValue(){
        return this.value
    }

    //Sets the name of the state to the given name.
    setName(name){
        this.name=name
    }

    //Sets the value of the state to the given value.
    setValue(value){
        this.value=value
    }

    // Returns true if the state is the initial state of the FSM, false otherwise.
    isInitialState(){
        return this.initialState
    }

    //Returns true if the state is a final state of the FSM, false otherwise.
    isFinalState(){
        return this.finalState
    }
}
