import test from "ava";
import { FSM, State } from "./index.js";

test("should add a new state", (t) => {
	const fsm = new FSM();
	const state = new State({
		name: "s0",
		value: 0,
		initialState: true,
		finalState: true,
	});
	fsm.addState(state);

	t.deepEqual(fsm.states, { s0: state });
});

test("should set the initial state if it is not already set", (t) => {
	const fsm = new FSM();
	const state = new State({
		name: "s0",
		value: 0,
		initialState: true,
		finalState: true,
	});

	fsm.addState(state);

	t.deepEqual(fsm.states, { s0: state });
	t.is(fsm.currentState, state);
	t.is(fsm.initialState, state);
});

test("should add new states", (t) => {
	const fsm = new FSM();

	fsm.addStates([
		new State({ name: "s1", value: 1, initialState: false, finalState: true }),
		new State({ name: "s2", value: 2, initialState: false, finalState: true }),
	]);

	t.deepEqual(Object.keys(fsm.states), ["s1", "s2"]);
});

test("should throw error if state with same name already exists", (t) => {
	const fsm = new FSM();

	const existingState = new State({
		name: "s1",
		value: 1,
		initialState: false,
		finalState: true,
	});
	fsm.addState(existingState);

	const error = t.throws(() => {
		fsm.addStates([
			new State({
				name: "s1",
				value: 2,
				initialState: false,
				finalState: true,
			}),
			new State({
				name: "s2",
				value: 3,
				initialState: false,
				finalState: true,
			}),
		]);
	});

	t.is(error.message, `State with name s1 already exists.`);
});

test("should throw error if invalid state is added", (t) => {
	const fsm = new FSM();

	const error = t.throws(() => {
		fsm.addStates([
			new State({
				name: "s1",
				value: 1,
				initialState: false,
				finalState: true,
			}),
			new State({}),
		]);
	});

	t.is(error.message, `Invalid State.`);
});

test("should add new inputs", (t) => {
	const fsm = new FSM();

	fsm.addInputs(["0", "1"]);

	t.deepEqual(fsm.inputs, new Set(["0", "1"]));
});

test("processStringInput should return final state for valid input", (t) => {
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

	const input = "110";
	const finalState = fsm.processStringInput(input);
	t.is(finalState.getName(), "s0");
	t.is(finalState.getValue(), 0);
});