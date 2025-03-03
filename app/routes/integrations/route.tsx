import React, { useCallback, useState } from 'react';
import { Box, Button, Heading, HelpText, HGrid, HStack, VStack } from '@navikt/ds-react';
import { useTranslation } from 'react-i18next';
import ReactFlow, {
    Background,
    Controls,
    Edge,
    MarkerType,
    Node,
    OnConnect,
    OnEdgesChange,
    OnNodesChange,
    ReactFlowInstance,
    ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import useStore from './store';
import { MiniMap } from '@reactflow/minimap';
import ChannelNode from '~/routes/integrations/nodes/ChannelNode';
import CustomParentNode from '~/routes/integrations/nodes/CustomParentNode';
import { useShallow } from 'zustand/react/shallow';
import { handleDropLogic } from '~/routes/integrations/utils/utils';
import CustomObjectNode from '~/routes/integrations/nodes/CustomObjectNode';
import CustomNode from '~/routes/integrations/nodes/CustomNode';
import StaticValueNode from '~/routes/integrations/nodes/StaticValueNode';
import SelectValueNode from '~/routes/integrations/nodes/SelectValueNode';
import TopMenu from './menu/TopMenu';
import VariableNode from './nodes/VariableNode';
import VariableInlineNode from './nodes/VariableInlineNode';
import OperationNode from './nodes/OperationNode';
import InnerFlowNode from './nodes/InnerFlowNode';

const nodeTypes = {
    subflow: CustomParentNode,
    openObject: CustomObjectNode,
    operation: OperationNode,
    innerflow: InnerFlowNode,
    channel: ChannelNode,
    customNode: CustomNode,
    static: StaticValueNode,
    select: SelectValueNode,
    variableNode: VariableNode,
    variableInlineNode: VariableInlineNode,
};

type StoreState = {
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

const selector = (state: StoreState) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    addNewNodeDrop: state.addNewNodeDrop,
    addSubNodes: state.addSubNodes,
});

export default function Index() {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.integrations' });

    const proOptions = { hideAttribution: true };
    const defaultViewport = { x: 0, y: 0, zoom: 1 };
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNewNodeDrop } = useStore(
        useShallow(selector)
    );

    const defaultEdgeOptions = {
        type: 'smoothstep',
        style: {
            strokeWidth: 2,
        },
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    };

    const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            const type = event.dataTransfer.getData('application/node-type');
            const dataString = event.dataTransfer.getData('application/reactflow');
            const data = JSON.parse(dataString);
            const position = reactFlowInstance?.screenToFlowPosition({
                x: event.clientX || 0,
                y: event.clientY || 0,
            });
            if (position) {
                handleDropLogic(reactFlowInstance, type, data, position, addNewNodeDrop);
            }
        },
        [reactFlowInstance, addNewNodeDrop]
    );

    // Type is the type of Node to that has been clicked
    // Data is the data associated with the clicked Node
    // Position is the position where the Node should be dropped
    // addNewNodeDrop is a function that adds a new Node to the ReactFlow graph
    // addSubNodes is a function that adds a new set of Nodes to the ReactFlow graph
    const onClickHandler = (nodeType: string, data: any) => {
        console.log('Element click handler');
        console.log('type: ', nodeType);
        console.log('data', data);
        const position = { x: 100, y: 100 }; // Example position
        handleDropLogic(reactFlowInstance, nodeType, data, position, addNewNodeDrop);
    };

    return (
        <VStack>
            <HStack
                id={'instances-custom-header'}
                align={'center'}
                justify={'space-between'}
                gap={'2'}
                wrap={false}>
                <HStack align={'center'} gap={'2'}>
                    <Heading size={'medium'}>{t('header')}</Heading>
                    <HelpText title={'Hva er dette'} placement="bottom">
                        {t('help.header')}
                    </HelpText>
                </HStack>
            </HStack>

            <TopMenu onClickHandler={onClickHandler} />

            <HGrid columns="w-100" style={{ height: '80vh' }}>
                <ReactFlowProvider>
                    <Box
                        id={'integration-table-container'}
                        background={'surface-default'}
                        padding="6"
                        borderRadius={'large'}
                        borderWidth="2"
                        borderColor={'border-subtle'}>
                        <ReactFlow
                            nodes={nodes}
                            onNodesChange={onNodesChange}
                            edges={edges}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            // fitView
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                            onInit={setReactFlowInstance}
                            proOptions={proOptions}
                            nodeTypes={nodeTypes}
                            defaultViewport={defaultViewport}
                            defaultEdgeOptions={defaultEdgeOptions}>
                            <Background />
                            <Controls />
                            <MiniMap />
                        </ReactFlow>
                    </Box>
                </ReactFlowProvider>
            </HGrid>
        </VStack>
    );
}
