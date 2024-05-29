"use client"

import ListBuilder from "./components/general-components/listbuilder";
import Wires from "./components/circuit-components/wires";
import { Wire } from "./types/wire";
import { Gate, QuantumGate } from "./types/gate";
import CircuitSidebar from "./components/circuit-components/circuit_sidebar"
import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPlay } from "@fortawesome/free-solid-svg-icons";

import { DndContext } from "@dnd-kit/core";

import { message } from '@tauri-apps/api/dialog'
import { getClient, Body, ResponseType } from '@tauri-apps/api/http';
import { listen } from "@tauri-apps/api/event";
import { Store } from "tauri-plugin-store-api";

import {Tooltip} from "@nextui-org/tooltip";

export default function Home() {
  const [addButtonEffect, setAddButtonEffect] = useState(false);
  const [playButtonEffect, setPlayButtonEffect] = useState(false);
  const [running, setRunning] = useState(false);

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

  const [probabilities, setProbabilities] = useState([]);

  const handleDragEnd = (event) => {
    setProbabilities([]);
    const {active, over} = event;
    
    if (over && over.data.current.accepts.includes(active.data.current.type)) {
      if (active.data.current.type === "gate" && active.data.current.gate.wires.length === 0) {
        let newWires = wires.map((wire: Wire, index: number) => {
          if (wire.index === over.data.current.wire.index) {
            wire.gates.push({
              index: wire.gates.length,
              type: QuantumGate[active.data.current.gate.type],
              wires: [wire.index]
            });
          }

          return wire;
        });
        
        setWires(newWires);
      } else {
        let newWires = wires.map((wire: Wire, index: number) => {
          if (active.data.current.gate.wires.includes(wire.index) && !active.data.current.gate.wires.includes(over.data.current.wire.index)) {
            wire.gates.splice(active.data.current.gate.index, 1);
          }

          return wire;
        });
        
        setWires(newWires);
      }
    } else {
      let newWires = wires.map((wire: Wire, index: number) => {
        if (active.data.current.gate.wires.includes(wire.index)) {
          wire.gates.splice(active.data.current.gate.index, 1);
        }

        return wire;
      });
      
      setWires(newWires);
    }
  }

  const getProbabilities = async () => {
    setRunning(true)

    try {
      const client = await getClient();

      const response = await client.post('http://127.0.0.1:5000/circuit', {
        type: "Json",
        payload: JSON.stringify({
          "data": wires
        }),
      });

      setRunning(false)

      return response.data;
    } catch(error) {
      console.error(error)
    }

    setRunning(false)

    return "Empty";
  }

  useEffect(() => {
    //listen to a event
    const unlisten = listen("save", async (e) => {
      const store = new Store(".circuit.json");

      await store.set("wires", wires);
      await store.save();
    });

    return () => {
      unlisten.then(f => f());
    }
  }, [wires]);

  useEffect(() => {
    const fetchWires = async () => {
      try {
        const store = new Store(".circuit.json");
        const storedWires = await store.get("wires");
        if (storedWires) {
          setWires(storedWires);
          // Update nextId based on the fetched wires
          const maxId = storedWires.reduce((max, wire) => Math.max(max, wire.index), 0);
          setNextId(maxId + 1);
        }
      } catch (error) {
        console.error("Failed to fetch wires from store:", error);
      }
    };

    fetchWires();
  }, []);

// onDragEnd={handleDragEnd}
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <CircuitSidebar />
      <main className="flex flex-col h-screen w-screen items-center gap-10 pl-10 py-10">
        <div className="fixed flex flex-row justify-between items-center w-screen">
          <Tooltip color="warning" content={
              <div className="flex p-4 rounded-lg border-[3px] border-black justify-center font-nunito items-center bg-primary-dark-highlight">
                  Press this button to run the simulation!
              </div>
          } placement="right" delay={1000}>
            <button onClick={async () => {
                if (!running) {
                  setPlayButtonEffect(true)

                  let response = await getProbabilities()

                  console.log(response)

                  if (response !== "Empty") {
                    setProbabilities(response.probabilities)
                  }
                } else {
                  await message("Program is running!");
                }
              }}
              className={`${
                playButtonEffect && "animate-bounce"
              } hover:bg-primary-dark-op50 hover:scale-110 transition-all duration-250 w-10 h-10 rounded-full flex items-center justify-center`}
              onAnimationEnd={() => setPlayButtonEffect(false)}>
                <FontAwesomeIcon
                  icon={ faPlay }
                  style={{ color: "black", fontSize: 20 }}
                />
              </button>
            </Tooltip>
            <button onClick={async () => {        
              if (wires.length < 10) {
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
                setAddButtonEffect(true);
      
                console.log(JSON.stringify(wires));
              } else {
                await message("Wire limit reached!");
              }
            }}
            className={`${
              addButtonEffect && "animate-bounce"
            } mr-10 hover:bg-primary-dark-op50 hover:scale-110 transition-all duration-250 w-10 h-10 rounded-full`}
            onAnimationEnd={() => setAddButtonEffect(false)}>
              <FontAwesomeIcon
                icon={ faPlus }
                style={{ color: "black", fontSize: 30 }}
              />
          </button>
        </div>
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
          className="flex flex-col gap-[50px] w-full mt-20"
        />
        {
          probabilities.length > 0 && <div className="flex flex-col w-full items-center justify-center font-nunito">
            <div className="text-lg">
              Listed below are probabilities of the qubit(s) being in
            </div>
            <ListBuilder
              items={probabilities}
              renderItem={
                (probability: number, index: number) => <li key={index}>
                  State {index}: {probability}
                </li>}
              className="text-md flex flex-col gap-[20px] w-full my-10 items-center justify-center"
            />
          </div>
        }
      </main>
    </DndContext>
  );
}