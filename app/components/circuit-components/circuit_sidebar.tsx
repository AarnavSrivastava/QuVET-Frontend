"use client"

import React, { useState } from "react";
import ListBuilder from "../general-components/listbuilder"
import { Gate, QuantumGate } from "../../types/gate";
import Gates from "./gates"
import { DndContext } from "@dnd-kit/core";

import {Tooltip} from "@nextui-org/tooltip";

export default function CircuitSidebar() {
    let [active, setActive] = useState(false);
    let gates = [
        {
            index: 0,
            type: QuantumGate.X,
            wires: [],
            description: "The X gate is one of the fundamental single-qubit quantum gates. It is also known as the Pauli-X gate and is analogous to a classical NOT gate. When applied to a qubit in the quantum circuit, it flips the state of the qubit, taking it from |0⟩ to |1⟩ and vice versa. Visually, you can think of it as a rotation of the Bloch sphere around the X-axis by π radians."
        },
        {
            index: 1,
            type: QuantumGate.Y,
            wires: [],
            description: "The Y gate is another fundamental single-qubit quantum gate, akin to the Pauli-Y gate in quantum mechanics. It introduces a phase flip in addition to flipping the qubit's state, distinguishing it from the X gate. Like the X gate, it rotates the qubit state, but this time around the Y-axis by π radians. The Y gate transforms |0⟩ to i|1⟩ and |1⟩ to -i|0⟩."
        },
        {
            index: 2,
            type: QuantumGate.Z,
            wires: [],
            description: "The Z gate is a single-qubit quantum gate that is analogous to a classical phase shift gate. When applied to a qubit, it leaves the |0⟩ state unchanged but introduces a phase flip of π radians (a sign change) to the |1⟩ state. Visually, it's represented as a rotation around the Z-axis of the Bloch sphere by π radians."
        },
        {
            index: 3,
            type: QuantumGate.H,
            wires: [],
            description: "The Hadamard gate is a key single-qubit quantum gate that creates superposition. When applied to a qubit in the state |0⟩, it puts it into an equal superposition of |0⟩ and |1⟩ states. Mathematically, it transforms |0⟩ to (|0⟩ + |1⟩) / √2 and |1⟩ to (|0⟩ - |1⟩) / √2. Visually, it can be thought of as a rotation around the axis (X + Z) / √2 of the Bloch sphere by π radians."
        },
        {
            index: 4,
            type: QuantumGate.S,
            wires: [],
            description: "The S gate, also known as the phase gate, introduces a π/2 phase shift to the state |1⟩. It leaves the |0⟩ state unchanged. This gate is valuable in quantum algorithms for manipulating the phase of quantum states, hence its name. Visually, it represents a quarter turn around the Z-axis of the Bloch sphere."
        },
        {
            index: 5,
            type: QuantumGate.T,
            wires: [],
            description: "The T gate is another phase gate that introduces a smaller phase shift compared to the S gate. It adds a phase of π/4 to the |1⟩ state, leaving the |0⟩ state unchanged. The T gate is particularly important in quantum computing algorithms due to its role in creating complex quantum interference patterns. It represents a rotation around the Z-axis of the Bloch sphere by π/4 radians."
        }
    ];

    return (
        <div className={`fixed flex flex-row items-center w-[300px] h-screen bg-transparent z-[100] overflow-y-visible overflow-x-visible ${(!active) ? "translate-x-[-270px]" : "translate-x-0"} transition-all ease-in-out duration-500`}>
            <div className="flex items-start justify-center w-[270px] h-screen bg-primary py-10">
                <ListBuilder
                    items={gates}
                    renderItem={(item, gateIndex: number) => (
                        <Tooltip className="w-[30%]" color="warning" content={
                            <div className="flex p-4 rounded-lg border-[3px] border-black justify-center font-nunito items-center bg-primary-dark-highlight">
                                {item.description}
                            </div>
                        } placement="right" key={gateIndex} delay={1000}>
                            <div>
                                <Gates
                                    handleDelete={(indexToDelete: number) => handleDelete(indexToDelete)}
                                    gate={item}
                                    index={gateIndex}
                                />
                            </div>
                        </Tooltip>
                    )}
                    className="flex flex-col items-center justify-start gap-[50px] w-[90%] z-10"
                />
            </div>
            <button className="flex justify-center items-center w-[30px] h-[100px] bg-primary py-4 rounded-lg -translate-x-[5px]"
                onClick={() => setActive(!active)}>
                <div className="h-[100%] bg-primary-dark border-2 border-primary-dark" />
            </button>
        </div>
    )
}