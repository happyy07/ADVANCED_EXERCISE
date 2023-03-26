import { FSM, State } from "./index.js";

//create a new FSM object using the new keyword:
let fsm = new FSM();

fsm.addState(
	new State({ name: "s0", value: 0, initialState: true, finalState: true })
);

fsm.addStates([
	new State({ name: "s1", value: 1, initialState: false, finalState: true }),
	new State({ name: "s2", value: 2, initialState: false, finalState: true }),
]);

fsm.addInputs(["0", "1"]);

fsm.addTransition({ fromState: "s0", input: "0", toState: "s0" });
fsm.addTransition({ fromState: "s0", input: "1", toState: "s1" });
fsm.addTransition({ fromState: "s1", input: "0", toState: "s2" });
fsm.addTransition({ fromState: "s1", input: "1", toState: "s0" });
fsm.addTransition({ fromState: "s2", input: "0", toState: "s1" });
fsm.addTransition({ fromState: "s2", input: "1", toState: "s2" });

fsm.processStringInput("1010");
fsm.processStringInput("110");
fsm.processStringInput("1110");
