import { Node } from 'reactflow';

export default [
    {
        id: '1',
        type: 'variableNode',
        position: { x: 120, y: 120 },
        data: {
            data: {
                category: 'STREAM',
                elementType: {
                    category: 'LIST',
                    elementType: { category: 'LIST', elementType: { category: 'STRING' } },
                },
            },
            displayName: 'Arkivansvarlig',
        },
    },
    {
        id: '2',
        type: 'variableNode',
        position: { x: 120, y: 240 },
        data: {
            data: {
                category: 'STREAM',
                elementType: { category: 'LIST', elementType: { category: 'STRING' } },
            },
            displayName: 'Saksnummer',
        },
    },
    {
        id: '3',
        type: 'variableNode',
        position: { x: 120, y: 350 },
        data: {
            data: {
                category: 'STREAM',
                elementType: { category: 'LIST', elementType: { category: 'INTEGER' } },
            },
            displayName: 'SaksId',
        },
    },
    {
        id: '4',
        type: 'variableNode',
        position: { x: 120, y: 460 },
        data: {
            data: {
                category: 'LIST',
                elementType: { category: 'STRING' },
            },
            displayName: 'Person X',
        },
    },
    {
        id: '5',
        type: 'variableNode',
        position: { x: 120, y: 570 },
        data: {
            data: {
                category: 'MAP',
                keyType: { category: 'STRING' },
                valueType: { category: 'INTEGER (Y)' },
            },
            displayName: 'Case Y',
        },
    },
] as Node[];
