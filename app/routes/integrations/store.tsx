import { create } from 'zustand';
import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    OnConnect,
    OnEdgesChange,
    OnNodesChange,
    XYPosition,
} from 'reactflow';

import initialNodes from './nodes';
import exampleVariableNodes from './examples/variableNodes';
import exampleVariableInlineNodes from './examples/variableInlineNodes';
import exampleOperationNodesSample from './examples/operationNodesSample';
import exampleOperationNodes from './examples/operationNodesSimple';
import initialEdges from './edges';

type RFState = {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;
    addNewNodeDrop: (newNode: Node) => void;
    addSubNodes: (newNode: Node[]) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<RFState>((set, get) => ({
    nodes: initialNodes,
    edges: initialEdges,
    onNodesChange: (changes: NodeChange[]) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    onConnect: (connection: Connection) => {
        set({
            edges: addEdge(connection, get().edges),
        });
    },
    setNodes: (nodes: Node[]) => {
        set({ nodes });
    },
    setEdges: (edges: Edge[]) => {
        set({ edges });
    },

    addNewNodeDrop: (newNode: Node) => {
        set((state) => ({
            nodes: state.nodes.concat(newNode),
        }));
    },
    addSubNodes: (newNode: Node[]) => {
        set((state) => ({
            nodes: state.nodes.concat(newNode),
        }));
    },
}));

export default useStore;
