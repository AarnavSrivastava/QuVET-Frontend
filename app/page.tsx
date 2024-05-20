"use client"

import ListBuilder from "./components/general-components/listbuilder";
import Wires from "./components/circuit-components/wires";
import { Wire } from "./types/wire";
import { Gate, QuantumGate } from "./types/gate";
import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { DndContext } from "@dnd-kit/core";

export default function Home() {
  const [buttonEffect, setButtonEffect] = useState(false);
  const [nextId, setNextId] = useState(1);
  const [wires, setWires] = useState([
    {
      index: 0,
      gates: [
        {
          index: 0,
          type: QuantumGate.X,
          wires: [0]
        }
      ]
    }
  ]);

  const handleDragEnd = (event) => {
    const {active, over} = event;

    console.log(event);

    if (over && over.data.current.accepts.includes(active.data.current.type)) {
      console.log(active);
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <main className="flex flex-col min-h-screen min-w-max items-end gap-10 pl-10 py-10">
        <button onClick={() => {        
          setWires(
            [
              ...wires,
              {
                index: nextId,
                gates: []
              }
            ]
          );

          setNextId(nextId + 1);
          setButtonEffect(true);
        }}
        className={`${
          buttonEffect && "animate-bounce"
        } mr-5 hover:bg-primary-dark-op50 hover:scale-110 transition-all duration-250 w-10 h-10 rounded-full`}
        onAnimationEnd={() => setButtonEffect(false)}>
          <FontAwesomeIcon
            icon={ faPlus }
            style={{ color: "black", fontSize: 30 }}
          />
        </button>
        <ListBuilder
          items={wires}
          renderItem={
            (item: Wire, index: number) => <Wires key={index} wire={item}
              handleDelete={(indexToDelete: number) => {
                if (wires.length !== 1) {
                  let newWires = wires.filter((wire: Wire) => wire.index !== indexToDelete);
                  setWires(newWires);
                }
              }
            }
          />}
          className="flex flex-col gap-[50px] w-full"
        />
      </main>
    </DndContext>
  );
}