"use client"
import React, { useState } from 'react';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import {v4 as uuidv4} from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Gates({handleDelete, index, gate}: any) {
    const [idUUID, setIdUUID] = useState(uuidv4());
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: `Gate-${gate.type}-${index}-${idUUID}`,
        data: {
            type: 'gate',
            id: idUUID,
            gate: gate
        }
    });

    const style = {
        transform: CSS.Translate.toString(transform),
    }

    return (
        <div id={idUUID} ref={setNodeRef} style={style} {...listeners} {...attributes} className="select-none flex justify-center items-center w-[100px] h-[100px] bg-primary-dark text-white text-[1.75rem] rounded-md font-playfair z-[10]">
            {gate.type}
        </div>
    );
}