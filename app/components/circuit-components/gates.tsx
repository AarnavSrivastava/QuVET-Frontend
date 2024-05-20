"use client"
import React, { useState } from 'react';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';

export default function Gates({handleDelete, index, gate}: any) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: `Gate ${gate}-${index}`,
        data: {
            type: 'gates',
        }
    });

    const style = {
        transform: CSS.Translate.toString(transform),
    }

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="flex justify-center items-center w-[100px] h-[100px] bg-primary-dark text-white text-[1.75rem] rounded-md font-playfair">
            {gate.type} 
        </div>
    );
}