import {NodeResizer, useStore} from "reactflow";
import {getRelativeNodesBounds} from "~/routes/integrations/utils/utils";
import {HStack} from "@navikt/ds-react";
import CustomHandleCollection from "~/routes/integrations/customNodes/customHandleCollection";
import handleConfigs, {HandleConfig, handleConfigsRight} from "~/routes/integrations/utils/handleConfigs";

interface NodeProps {
    id: string;
    selected: boolean;
    data: {
        label: string,
        inputType: string
    }
}

function CollectionNode({ id, data, selected }: NodeProps)  {

    const handles: HandleConfig[] = handleConfigs[data.inputType] || handleConfigs.default;
    const handlesRight: HandleConfig[] = handleConfigsRight[data.inputType] || null;

    const { minWidth, minHeight, hasChildNodes, parentHeight, parentWidth } = useStore((store) => {
        const childNodes = Array.from(store.nodeInternals.values()).filter(
            (n) => n.parentId === id
        );

        const parentNode = store.nodeInternals.get(id);
        const rect = getRelativeNodesBounds(childNodes);

        if(childNodes.length === 0) {
            return {
                minWidth: 500,
                minHeight: 200,
                hasChildNodes: false,
                parentHeight: parentNode?.height,
                parentWidth: parentNode?.width,
            };
        }

        // TODO set default with children to no less than width and height to 500 and 200
        return {
           minWidth: Math.max(rect.x + rect.width, 500),
            minHeight: Math.max(rect.y + rect.height, 200),
            hasChildNodes: childNodes.length > 0,
            parentHeight: parentNode?.height,
            parentWidth: parentNode?.width,
        };
    });

    return (
            <HStack
                className="flex border-black rounded-3xl border -z-50"
                style={{
                    width: parentWidth? parentWidth : 500,
                    height: parentHeight? parentHeight : 200,
                }}
            >
                <NodeResizer
                    minHeight={minHeight + 20}
                    minWidth={minWidth + 20}
                    // onResize={onResize}
                    lineStyle={{borderColor: 'black'}}
                    isVisible={selected}
                />



                {handles.map((handle: HandleConfig, index: number) => (
                    <CustomHandleCollection
                        key={index}
                        position={handle.position}
                        labelText={handle.labelText}
                        id={handle.id}
                        icon={handle.icon}
                        className={handle.className}
                        isArray={handle.isArray}
                    />
                ))}

                <div
                    className="flex-none rounded-l-3xl bg-zinc-100"
                    style={{
                        flexBasis: '40px',
                        // backgroundColor: 'lightgray',
                    }}
                >
                </div>

                <div
                    className="flex-1"
                    // style={{
                    //     backgroundColor: 'white',
                    // }}
                >

                    {data.inputType}
                    ({hasChildNodes ? 'has children' : 'no children'})
                    (h: {parentHeight},  w: {parentWidth})


                </div>


                {handlesRight?.map((handle: HandleConfig, index: number) => (
                    <CustomHandleCollection
                        key={index}
                        position={handle.position}
                        labelText={handle.labelText}
                        id={handle.id}
                        icon={handle.icon}
                        className={handle.className}
                        isArray={handle.isArray}
                        isOptional={handle.isOptional}
                    />
                ))}

                <div
                    className="flex-none rounded-r-3xl bg-zinc-100"
                    style={{
                        flexBasis: '40px',
                    }}
                ></div>
        </HStack>

    );
}

export default CollectionNode;