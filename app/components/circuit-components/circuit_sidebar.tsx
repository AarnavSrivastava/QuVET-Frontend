"use client"

import React, { useState } from "react";
import ListBuilder from "../general-components/listbuilder"
import { Gate, QuantumGate } from "../../types/gate";
import Gates from "./gates"
import { DndContext } from "@dnd-kit/core";

export default function CircuitSidebar() {
    let [active, setActive] = useState(false);
    let gates = [
        {
            index: 0,
            type: QuantumGate.X,
            wires: []
        },
        {
            index: 1,
            type: QuantumGate.Y,
            wires: []
        },
        {
            index: 2,
            type: QuantumGate.Z,
            wires: []
        },
        {
            index: 3,
            type: QuantumGate.H,
            wires: []
        },
        {
            index: 4,
            type: QuantumGate.S,
            wires: []
        },
        {
            index: 5,
            type: QuantumGate.T,
            wires: []
        }
    ];

    return (
        <div className={`fixed flex flex-row items-center w-[300px] h-screen bg-transparent z-[100] overflow-y-visible overflow-x-visible ${(!active) ? "translate-x-[-270px]" : "translate-x-0"} transition-all ease-in-out duration-500`}>
            <div className="flex items-start justify-center w-[270px] h-screen bg-primary py-10">
                <ListBuilder
                    items={gates}
                    renderItem={(item: Gate, gateIndex: number) => (
                        <Gates 
                            key={gateIndex}
                            handleDelete={(indexToDelete: number) => handleDelete(indexToDelete)}
                            gate={item}
                            index={gateIndex}
                        />
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