"use client"

import ListBuilder from "./components/general-components/listbuilder.tsx";
import Wires from "./components/circuit-components/wires.tsx";
import { Wire } from "./types/wire.tsx";
import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [buttonEffect, setButtonEffect] = useState(false);
  const [nextId, setNextId] = useState(1);
  const [wires, setWires] = useState([
    {
      index: 0,
      gates: []
    }
  ]);

  return (
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
      } mr-5 hover:bg-paynes-grey-op50 hover:scale-110 transition-all duration-250 w-10 h-10 rounded-full`}
      onAnimationEnd={() => setButtonEffect(false)}>
        <FontAwesomeIcon
          icon={ faPlus }
          style={{ color: "black", fontSize: 30 }}
        />
      </button>
      <ListBuilder
        items={wires}
        renderItem={(item) => <Wires key={item.index} {...item} />}
        handleDelete={(indexToDelete) => {
          if (wires.length !== 1) {
            const newWires = wires.filter((wire) => wire.index !== indexToDelete)
            setWires(newWires);
          }
        }}
        className="flex flex-col gap-[50px] w-full"
      />
    </main>
  );
}