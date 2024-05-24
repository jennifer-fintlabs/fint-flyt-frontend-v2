import React, {useCallback, useState} from 'react';
import {Box, Button, Heading, HelpText, HGrid, HStack, VStack} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import ReactFlow, {
    Background,
    Controls,
    Edge,
    Node, OnConnect, OnEdgesChange,
    OnNodesChange,
    ReactFlowInstance,
    ReactFlowProvider, useReactFlow, XYPosition,
} from 'reactflow';
import 'reactflow/dist/style.css';
import useStore from './store';
import {MiniMap} from "@reactflow/minimap";
import ChannelNode from "~/routes/integrations/customNodes/ChannelNode";
import SidebarMenu from "~/routes/integrations/menu/SidebarMenu";
import StaticValueNode from "~/routes/integrations/customNodes/StaticValueNode";
import SubFlowNode from "~/routes/integrations/customNodes/SubFlowNode";
import {useShallow} from "zustand/react/shallow";
import {getNodePositionInsideParent, getId} from "~/routes/integrations/utils";

const nodeTypes = {
    channel: ChannelNode,
    static: StaticValueNode,
    subflow: SubFlowNode
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


// let id = 0;
// const getId = () => `dndnode_${id++}`;


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
        addSubNodes,
    } = useStore(useShallow(selector));

    const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);


    const onDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();

            // DIVIDE UP ON DROPS BY TYPE ??
            const type = event.dataTransfer.getData('application/reactflow');
            const inputType = event.dataTransfer.getData('application/input-type');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

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
                console.log('Group node:', groupNode);

                const newNode: Node = {
                    id: getId(),
                    type,
                    position,
                    data: { inputType: `${inputType}`, label: `${inputType} node`},
                    className: 'light',
                };


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

                //todo: Make this a function in a library
                if(inputType === 'subflow-if-else') {
                    // addParentNode(newNode);
                    const parentId = newNode.id;
                    const subNode: Node[] = [
                        {
                        id: getId(),
                        position: { x: 50, y: 100 },
                        className: 'light',
                        parentId: parentId,
                        extent: "parent",
                        data: { inputType: `subflow child`, label: "child node"},
                    }
                    ];
                    addSubNodes(subNode);
                }

                if(inputType === 'subflow-map') {
                    // addParentNode(newNode);
                    const parentId = newNode.id;
                    console.log("adding subflow-map child", position)
                    const subNode: Node[] = [
                        {
                            id: getId(),
                            position: { x: 50, y: 100 },
                            className: 'light',
                            parentId: parentId,
                            extent: "parent",
                            data: { inputType: `subflow child`, label: "child node"},
                        },
                        {
                            id: getId(),
                            position: { x: 600, y: 100 },
                            className: 'light',
                            parentId: parentId,
                            extent: "parent",
                            data: { inputType: `subflow child`, label: "child node 2"},
                        }
                    ];
                    addSubNodes(subNode);
                }

                // console.log("adding new node:", newNode);
            }
        },
        [reactFlowInstance],
    );

    //todo: Make this a function in a library


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

            <HGrid columns="250px auto" style={{height:800}} gap={"5"}>
                <ReactFlowProvider>
                    <VStack>

                        <Box
                            id={"flow-buttons"}
                            background={"surface-default"}
                            padding="6"
                            borderRadius={"large"}
                            borderWidth="2"
                            borderColor={"border-subtle"}
                        >

                            <SidebarMenu />
                        </Box>


                    </VStack>

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