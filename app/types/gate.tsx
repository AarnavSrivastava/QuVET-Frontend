export enum QuantumGate {
    X = 'X',
    Y = 'Y',
    Z = 'Z',
    H = 'H',
    CNOT = 'CNOT',
    SWAP = 'SWAP',
    Toffoli = 'Toffoli',
    S = 'S',
    T = 'T',
    Measurement = 'Measurement'
}

export interface Gate {
    index: number;
    type: QuantumGate;
    wires: number[];
}