import { Gate } from "./gate.tsx";

export interface Wire {
    index: number;
    gates: Gate[];
}