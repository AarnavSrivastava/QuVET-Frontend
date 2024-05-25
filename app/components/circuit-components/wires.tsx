"use client"
import React, { useState } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Wire } from '../../types/wire';
import { Gate } from '../../types/gate';
import ListBuilder from '../general-components/listbuilder';
import Gates from './gates';
import {useDroppable} from '@dnd-kit/core';
import { DndContext } from "@dnd-kit/core";

import { resourceDir } from '@tauri-apps/api/path';

// const resourceDirPath = await resourceDir();

async function getDirPath() {
    // const resourceDirPath = await resourceDir();
    // console.log(resourceDirPath);
}

export default function Wires({handleDelete, index, wire}: any) {
    const {setNodeRef} = useDroppable({
        id: `wire-surface-${wire.index}`,
        data: {
          accepts: ['gate'],
          wire: wire
        }
    });
    
    return (
        <div
            className="flex flex-row justify-start items-center py-10 relative group"
            ref={setNodeRef}
        >
            <div className="group-hover:scale-100 scale-0 absolute flex justify-center items-center w-10 h-10 m-4 z-20 transition-all ease-in-out">
                <button
                    className="w-full h-full hover:bg-accent bg-primary rounded-full border-4 border-black transition-all duration-250"
                    onClick={() => getDirPath()}
                >
                    {/* handleDelete(wire.index) */}
                    <FontAwesomeIcon
                        icon={faXmark}
                        style={{ color: "black", fontSize: 30 }}
                    />
                </button>
            </div>
            <div className="flex w-full justify-center items-center relative">
                <ListBuilder
                    items={wire.gates}
                    renderItem={(item: Gate, gateIndex: number) => (
                        <Gates 
                            key={gateIndex}
                            handleDelete={(indexToDelete: number) => handleDelete(indexToDelete)}
                            gate={item}
                            index={gateIndex}
                        />
                    )}
                    className="flex flex-row items-center justify-start gap-[50px] w-full pr-10 z-10 ml-[150px]"
                />
                <div className="absolute z-0 w-full h-1 border-2 border-primary-dark bg-primary-dark" />
            </div>
        </div>
    );
}