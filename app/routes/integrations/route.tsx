import React, {useCallback, useState} from 'react';
import {Box, Button, Heading, HelpText, HGrid, HStack, VStack} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import ReactFlow, {
    Background,
    Controls,
    Edge, MarkerType,
    Node, OnConnect, OnEdgesChange,
    OnNodesChange,
    ReactFlowInstance,
    ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import useStore from './store';
import {MiniMap} from "@reactflow/minimap";
import ChannelNode from "~/routes/integrations/nodes/ChannelNode";
import CustomParentNode from "~/routes/integrations/nodes/CustomParentNode";
import {useShallow} from "zustand/react/shallow";
import {getNodePositionInsideParent, getId} from "~/routes/integrations/utils/utils";
import CustomObjectNode from "~/routes/integrations/nodes/CustomObjectNode";
import OperationsNode from "~/routes/integrations/nodes/OperationsNode";
import StaticValueNode from "~/routes/integrations/nodes/StaticValueNode";
import SelectValueNode from "~/routes/integrations/nodes/SelectValueNode";
import TopMenu from './menu/TopMenu';

const nodeTypes = {
    subflow: CustomParentNode,
    openObject: CustomObjectNode,
    channel: ChannelNode,
    customNode: OperationsNode,
    static: StaticValueNode,
    select: SelectValueNode
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
    const {t} = useTranslation('translations', {keyPrefix: 'pages.integrations'})

    const proOptions = { hideAttribution: true };
    const defaultViewport = { x: 0, y: 0, zoom: 1 };
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

    const {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        addNewNodeDrop,
    } = useStore(useShallow(selector));

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

            console.log('Dropped:', type, data);

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            console.log('Dropped:', type, data);
            if (reactFlowInstance) {

                const position = reactFlowInstance.screenToFlowPosition({
                    x: event.clientX,
                    y: event.clientY,
                });

                const intersections = reactFlowInstance.getIntersectingNodes({
                    x: position.x,
                    y: position.y,
                    width: 40,
                    height: 40,
                }).filter((n) => n.type === 'subflow');

                const groupNode = intersections[0];
                // console.log('Group node add:', groupNode);
                // console.log('Position:', position);

                const newNode: Node = {
                    id: getId(),
                    type,
                    position,
                    data,
                };

                // if(type === 'subflow') {
                //     newNode.style = {
                //         // width: 450,
                //         // height: 200,
                //         // background: 'lightgray',
                //         // border: '1px solid black',
                //         // borderRadius: 15,
                //         // paddingRight: 50,
                //         // paddingLeft: 50,
                //         // borderRight: '25px solid lightgray',
                //         // borderLeft: '25px solid lightgray'
                //
                //     } ;
                //     // newNode.className = 'border-r border-l border-gray-300 border-[10px] bg-amber-500';
                // }

                if (groupNode) {
                    // if we drop a node on a group node, we want to position the node inside the group
                    newNode.position = getNodePositionInsideParent(
                        {
                            position,
                            width: 40,
                            height: 40,
                        },
                        groupNode
                    ) ?? { x: 0, y: 0 };
                    newNode.parentId = groupNode?.id;
                    newNode.expandParent = true;
                }

                addNewNodeDrop(newNode);
            }
        },
        [reactFlowInstance],
    );

    return (
        <VStack>
            <HStack id={'instances-custom-header'} align={"center"} justify={"space-between"} gap={"2"} wrap={false}>
                <HStack align={"center"} gap={"2"}>
                    <Heading size={"medium"}>{t('header')}</Heading>
                    <HelpText title={"Hva er dette"} placement="bottom">
                        {t('help.header')}
                    </HelpText>
                </HStack>
            </HStack>


            <TopMenu />

           

            <HGrid columns="w-100" style={{height:800}}>
                <ReactFlowProvider>
                    <Box id={"integration-table-container"} background={"surface-default"} padding="6" borderRadius={"large"}
                         borderWidth="2" borderColor={"border-subtle"}>
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
                            defaultEdgeOptions={defaultEdgeOptions}
                        >
                            <Background/>
                            <Controls/>
                            <MiniMap />

                        </ReactFlow>
                    </Box>

                </ReactFlowProvider>
            </HGrid>
            <Box
                id={"flow-buttons"}
                background={"surface-default"}
                padding="6"
                borderRadius={"large"}
                borderWidth="2"
                borderColor={"border-subtle"}
            >
                <Button onClick={() => console.log(nodes)}>Print nodes</Button>
                <Button onClick={() => console.log(edges)}>Print edges</Button>
            </Box>
        </VStack>
    );
}