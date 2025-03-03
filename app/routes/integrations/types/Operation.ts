import { DataType } from '~/types/types';

export interface TypeParameterConstraints {
    type: string;
}

export interface TypeParameterDeclaration {
    typeParameterId: string;
    displayText: DisplayText;
    constraints?: TypeParameterConstraints;
}

export interface VariableDeclaration {
    order: number;
    key: string;
    displayText: DisplayText;
    dataType: DataType;
}

export interface OperationVariables {
    inputVariables: VariableDeclaration[];
    outputVariables: VariableDeclaration[];
}

export interface OperationDeclaration {
    operationIdUniqueForCategory: string;
    displayText: DisplayText;
    iconId: string;
    typeParameters: TypeParameterDeclaration[];
    operationVariables: OperationVariables;
}

export type DisplayText = string;

export interface OperationVariableDeclarations {
    inputVariables: VariableDeclaration[];
    outputVariables: VariableDeclaration[];
}
// Flow Declaration
export interface FlowDeclaration {
    order: number;
    displayText: string;
    multiple: boolean;
    externalVariables: OperationVariableDeclarations;
    internalVariables: OperationVariableDeclarations;
}

// Inner Flow Operation
export interface InnerFlowOperationDeclaration {
    outerOperation: OperationDeclaration;
    innerFlowVariables: OperationVariableDeclarations;
    locked: boolean;
}

// Multi Flow Operation
export interface MultiFlowOperationDeclaration {
    outerOperation: OperationDeclaration;
    flows: FlowDeclaration[];
}

// Root structure for the JSON
export interface FlowOperations {
    innerFlowOperations: InnerFlowOperationDeclaration[];
    multiFlowOperations: MultiFlowOperationDeclaration[];
}
