"use client"
import React, { useState } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Wires({handleDelete}, wire, key) {
    const [visible, setVisible] = useState(false);
    return (
        <div
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            className="flex flex-row justify-start items-center py-10"
        >
            {visible && 
                <div className="absolute flex justify-center items-center w-10 h-10">
                    <button
                        className="w-full h-full hover:bg-china-rose bg-china-rose-op50 rounded-full border-2 border-black transition-all duration-250"
                        onClick={() => handleDelete(key)}
                    >
                        <FontAwesomeIcon
                            icon={ faXmark }
                            style={{ color: "black", fontSize: 30 }}
                        />
                    </button>
                </div>
            }
            <div className="w-full h-1 border-2 border-gunmetal bg-gunmetal" />
        </div>
    );
}