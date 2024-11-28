import { Node } from 'reactflow';

export default [
    // {
    //     id: '1',
    //     type: 'dataTypeNode',
    //     position: { x: 120, y: 120 },
    //     data: {
    //         category: 'STREAM',
    //         elementType: { category: 'LIST', elementType: { category: 'STRING' } },
    //     },
    // },
    // {
    //     id: '2',
    //     type: 'dataTypeNode',
    //     position: { x: 120, y: 220 },
    //     data: {
    //         category: 'LIST',
    //         elementType: { category: 'STRING' },
    //     },
    // },
    // {
    //     id: '3',
    //     type: 'dataTypeNode',
    //     position: { x: 120, y: 320 },
    //     data: {
    //         category: 'MAP',
    //         keyType: { category: 'STRING' },
    //         valueType: { category: 'INTEGER' },
    //     },
    // },
    {
        id: '1',
        type: 'variableNode',
        position: { x: 120, y: 120 },
        data: {
            data: {
                category: 'STREAM',
                elementType: { category: 'LIST', elementType: { category: 'STRING' } },
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
            displayName: 'saksnummer',
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
            displayName: 'nummer',
        },
    },
] as Node[];
