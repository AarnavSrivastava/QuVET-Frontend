"use client"

import ListBuilder from "../components/general-components/listbuilder";
import Wires from "../components/circuit-components/wires";
import { Wire } from "../types/wire";
import { Gate, QuantumGate } from "../types/gate";
import CircuitSidebar from "../components/circuit-components/circuit_sidebar"
import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPlay, faHouse } from "@fortawesome/free-solid-svg-icons";

import { DndContext } from "@dnd-kit/core";

import { message } from '@tauri-apps/api/dialog'
import { getClient, Body, ResponseType } from '@tauri-apps/api/http';
import { listen } from "@tauri-apps/api/event";
import { Store } from "tauri-plugin-store-api";

import {Tooltip} from "@nextui-org/tooltip";

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

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
      if (active.data.current.type === "gate" && active.data.current.gate.wires.length === 0 && over.data.current.wire.gates.length < 8) {
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
      } else if (!active.data.current.gate.wires.includes(over.data.current.wire.index)) {
        let newWires = wires.map((wire: Wire, index: number) => {
          if (active.data.current.gate.wires.includes(wire.index)) {
            let i = 0;
            wire.gates.map((gate: Gate, gate_index: number) => {
              if (gate.index === active.data.current.gate.index) {
                i = gate_index;
              }
            })
            
            wire.gates.splice(i, 1);
          }

          return wire;
        });
        
        setWires(newWires);
      }
    } else {
      let newWires = wires.map((wire: Wire, index: number) => {
        if (active.data.current.gate.wires.includes(wire.index)) {
          let i = 0;
          wire.gates.map((gate: Gate, gate_index: number) => {
            if (gate.index === active.data.current.gate.index) {
              i = gate_index;
            }
          })
          
          wire.gates.splice(i, 1);
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
    const unlisten_save = listen("save", async (e) => {
      const store = new Store(".circuit.json");

      await store.set("wires", wires);
      await store.save();
    });

    const unlisten_run = listen("run", async (e) => {
      if (!running) {
        let response = await getProbabilities()

        console.log(response)

        if (response !== "Empty") {
          setProbabilities(response.probabilities)
        }
      } else {
        await message("Program is running!");
      }
    });

    const unlisten_clear = listen("clear", async (e) => {
      setWires([{
        index: 0,
        gates: []
      }]);

      setNextId(0);

      setProbabilities([]);
    });

    return () => {
      unlisten_save.then(f => f());
      unlisten_run.then(g => g());
      unlisten_clear.then(h => h());
    }
  }, [wires, probabilities, running]);

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
      <main className="flex flex-col h-full w-full items-center gap-10 py-10">
        <div className="fixed flex flex-row justify-between items-center w-full px-5">
          <div className="flex flex-row justify-start gap-5 items-center">
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

                setProbabilities([]);
      
                console.log(JSON.stringify(wires));
              } else {
                await message("Wire limit reached!");
              }
            }}
            className={`${
              addButtonEffect && "animate-bounce"
            } hover:bg-primary-dark-op50 hover:scale-110 transition-all duration-250 w-10 h-10 rounded-full flex items-center justify-center`}
            onAnimationEnd={() => setAddButtonEffect(false)}>
              <FontAwesomeIcon
                icon={ faPlus }
                style={{ color: "black", fontSize: 25 }}
              />
            </button>
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
          </div>
          <button onClick={async () => {        
            const store = new Store(".circuit.json");

            await store.set("wires", wires);
            await store.save();

            router.back();
          }}
          className={`${
            addButtonEffect && "animate-bounce"
          } hover:bg-primary-dark-op50 hover:scale-110 transition-all duration-250 w-10 h-10 rounded-full flex items-center justify-center`}
          onAnimationEnd={() => setAddButtonEffect(false)}>
            <FontAwesomeIcon
              icon={ faHouse }
              style={{ color: "black", fontSize: 22 }}
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

                setProbabilities([]);
              }
            }
          />}
          className="flex flex-col gap-[50px] w-full mt-20 pl-10"
        />
        {
          probabilities.length > 0 && <div className="relative flex flex-col w-full items-center justify-center">
            <div className="w-[60%] h-[2px] bg-primary-light mb-10" />
            <div className="text-[28px] font-dosis">
              Listed below are probabilities of the qubit{wires.length > 0 ? 's' : ''} being in {wires.length > 0 ? '' : 'a'} classical state{wires.length > 0 ? 's' : ''}:
            </div>
            <ListBuilder
              items={probabilities}
              renderItem={
                (probability: number, index: number) => <li key={index} className="flex flex-row items-center justify-center font-nunito text-[20px]">
                  <div className="italic font-extrabold">P({index.toString(2).padEnd(wires.length.toString(2).length * 2, '0')})</div>: {probability.toFixed(4)}, or {probability.toFixed(4) * 100}%
                </li>}
              className="text-md flex flex-col gap-[20px] w-full my-10 items-center justify-center"
            />
          </div>
        }
      </main>
    </DndContext>
  );
}