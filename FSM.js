/*
FSM (Finite State Machine) class represents a finite state machine that can 
process a string input and transition from one state to another based on the input. 
It is used to model systems that can be in one of a finite number of states 
and transition from one state to another based on the input. 
*/

export default class FSM {
	//constructor
	constructor() {
		this.states = {};
		this.inputs = new Set();
		this.transitions = {};
		this.currentState = null;
		this.initialState = null;
	}

	//Adds a state to the FSM. The state must be an instance of the State class.
	addState(state) {
		this.states[state.getName()] = state;
		if (state.isInitialState()) {
			if (!this.currentState) {
				this.currentState = state;
				this.initialState = state;
			} else {
				throw new Error("Initial state already set.");
			}
		}
	}

	//Adds an array of states to the FSM. Each state must be an instance of the State class.
	addStates(newStates) {
		for (const state of newStates) {
			if (this.states[state.getName()]) {
				throw new Error(`State with name ${state.getName()} already exists.`);
			}
			if (state.getName() && state.getValue()) {
				this.addState(state);
			} else {
				throw new Error(`Invalid State.`);
			}
		}
	}

	//Adds a single input alphabet to the FSM.
	addInputs(input) {
		this.inputs.add(input);
	}

	//Adds an array of input alphabets to the FSM.
	addInputs(newInputs) {
		this.inputs = new Set([...this.inputs, ...newInputs]);
	}

	/*
	Adds a transition to the FSM. The transition must be an object with the following properties:
	fromState: The name of the state from which the transition starts.
	input: The input alphabet that triggers the transition.
	toState: The name of the state to which the transition leads.
	*/
	addTransition(transition) {
		if (!this.transitions[transition.fromState]) {
			this.transitions[transition.fromState] = {};
		}

		this.transitions[transition.fromState][transition.input] =
			this.states[transition.toState];
	}

	//Transitions from the current state to the next state based on the input element.
	transition(element) {
		if (this.canPerformTransition(element)) {
			this.currentState =
				this.transitions[this.currentState.getName()][element];
		}
	}

	//Checks if a transition can be performed based on the input element. Returns true if the transition can be performed, and throws an error otherwise.
	canPerformTransition(element) {
		if (!this.currentState) {
			throw new Error("Initial state not set.");
		} else if (!this.inputs.size) {
			throw new Error("No input alphabets set.");
		} else if (!this.inputs.has(element)) {
			throw new Error(
				"Invalid input alphabet. It must be one of " + [...this.inputs]
			);
		} else if (!this.transitions[this.currentState.getName()]?.[element]) {
			throw new Error(
				"Transition for element " +
					element +
					" not set for state:" +
					this.currentState.getName()
			);
		}
		return true;
	}

	/*
	Processes a string input by transitioning from one state to another based on 
	each input element. Returns the final state after all input elements have been 
	processed. If the final state is a final state, its value is logged to the console. 
	If the final state is not a final state, an error is thrown.
	*/
	processStringInput(input) {
		if (!(typeof input === "string" || input instanceof String)) {
			throw new Error("Invalid input string.");
		}
		for (const element of input) {
			this.transition(element);
		}
		if (this.currentState.isFinalState()) {
			console.log(
				`Output for state ${this.currentState.getName()} = ${this.currentState.getValue()}`
			);
			let returnState = this.states[this.currentState.getName()];
			this.currentState = this.initialState;
			return returnState;
		} else {
			this.currentState = this.initialState;
			throw new Error("State machine in invalid state.");
		}
	}
}
