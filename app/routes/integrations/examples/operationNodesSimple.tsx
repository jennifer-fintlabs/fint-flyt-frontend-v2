import { Node } from 'reactflow';

export default [
    {
        id: '2',
        type: 'operation',
        position: {
            x: 30,
            y: 100,
        },
        data: {
            operationIdUniqueForCategory: 'xxxx',
            displayText: 'Til store bokstaver',
            iconId: 'ChevronRightDoubleCircleFillIcon',
            operationVariables: {
                inputVariables: [
                    {
                        order: 1,
                        key: 'xx',
                        displayText: 'Fullt navn (inngående)',
                        dataType: {
                            category: 'STRING',
                        },
                    },
                ],
                outputVariables: [
                    {
                        order: 1,
                        key: 'xxx',
                        displayText: 'Fullt navn (utgående)',
                        dataType: {
                            category: 'STRING',
                        },
                    },
                ],
            },
        },
    },
    {
        id: '3',
        type: 'operation',
        position: {
            x: 100,
            y: 500,
        },
        data: {
            operationIdUniqueForCategory: 'xxxx',
            displayText: 'Dato + klokkeslett Tidspunkt',
            iconId: 'ChevronRightDoubleCircleFillIcon',
            operationVariables: {
                inputVariables: [
                    {
                        order: 1,
                        key: 'xx',
                        displayText: 'Dato',
                        dataType: {
                            category: 'RECORD',
                            recordTypeDeclarationId: 'DATE',
                        },
                    },
                    {
                        order: 2,
                        key: 'xx',
                        displayText: 'Klokkeslett',
                        dataType: {
                            category: 'RECORD',
                            recordTypeDeclarationId: 'TIME',
                        },
                    },
                ],
                outputVariables: [
                    {
                        order: 1,
                        key: 'xxx',
                        displayText: 'Sammenslått',
                        dataType: {
                            category: 'RECORD',
                            recordTypeDeclarationId: 'DATETIME',
                        },
                    },
                ],
            },
        },
    },
    {
        id: '4',
        type: 'operation',
        position: {
            x: 100,
            y: 280,
        },
        data: {
            operationIdUniqueForCategory: 'xxxx',
            displayText: 'Splitt tekst',
            iconId: 'ChevronRightDoubleCircleFillIcon',
            operationVariables: {
                inputVariables: [
                    {
                        order: 1,
                        key: 'xx',
                        displayText: 'Lang tekst',
                        dataType: {
                            category: 'STRING',
                        },
                    },
                ],
                outputVariables: [
                    {
                        order: 1,
                        key: 'xxx',
                        displayText: '1️⃣ Del 1',
                        dataType: {
                            category: 'STRING',
                        },
                    },

                    {
                        order: 2,
                        key: 'xx',
                        displayText: '2️⃣ Del 2',
                        dataType: {
                            category: 'STRING',
                        },
                    },
                ],
            },
        },
    },
    {
        id: '5',
        type: 'operation',
        position: {
            x: 650,
            y: 100,
        },
        data: {
            operationIdUniqueForCategory: 'adder tall',
            displayText: 'Multipliser Double tall',
            iconId: 'ChevronRightDoubleCircleFillIcon',
            operationVariables: {
                inputVariables: [
                    {
                        order: 2,
                        key: 'second_tall',
                        displayText: 'Second tall',
                        dataType: {
                            category: 'DECIMAL',
                        },
                    },
                    {
                        order: 1,
                        key: 'first_tall',
                        displayText: 'First Tall',
                        dataType: {
                            category: 'DECIMAL',
                        },
                    },
                ],
                outputVariables: [
                    {
                        order: 1,
                        key: 'result',
                        displayText: 'Result',
                        dataType: {
                            category: 'DECIMAL',
                        },
                    },
                ],
            },
        },
    },
    {
        id: '6',
        type: 'operation',
        position: {
            x: 600,
            y: 500,
        },
        data: {
            operationIdUniqueForCategory: 'fsfsdlfl',
            displayText: 'Og (Boolean)',
            iconId: 'ChevronRightDoubleCircleFillIcon',
            operationVariables: {
                inputVariables: [
                    {
                        order: 2,
                        key: 'second_tall',
                        displayText: 'Second condition',
                        dataType: {
                            category: 'BOOLEAN',
                        },
                    },
                    {
                        order: 1,
                        key: 'first_tall',
                        displayText: 'First condition',
                        dataType: {
                            category: 'BOOLEAN',
                        },
                    },
                ],
                outputVariables: [
                    {
                        order: 1,
                        key: 'result',
                        displayText: 'Result condition',
                        dataType: {
                            category: 'BOOLEAN',
                        },
                    },
                ],
            },
        },
    },
    {
        id: '7',
        type: 'operation',
        position: {
            x: 670,
            y: 280,
        },
        data: {
            operationIdUniqueForCategory: 'xxxx',
            displayText: 'Opprett Samling',
            iconId: 'ChevronRightDoubleCircleFillIcon',
            operationVariables: {
                inputVariables: [
                    {
                        order: 1,
                        key: 'xx',
                        displayText: 'Item 1',
                        dataType: {
                            category: 'STRING',
                        },
                    },
                    {
                        order: 2,
                        key: 'xx',
                        displayText: 'Item 2',
                        dataType: {
                            category: 'STRING',
                        },
                    },
                ],
                outputVariables: [
                    {
                        order: 1,
                        key: 'xxx',
                        displayText: 'Samlet',
                        dataType: {
                            category: 'LIST',
                            elementType: { category: 'STRING' },
                        },
                    },
                ],
            },
        },
    },
] as Node[];
