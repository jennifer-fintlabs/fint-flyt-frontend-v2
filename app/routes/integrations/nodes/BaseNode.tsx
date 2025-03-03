import { Connection, Handle, Position } from 'reactflow';
import { VariableDeclaration } from '../types/Operation';
import CustomHandle from './CustomHandle';
import { ChevronRightDoubleCircleFillIcon } from '@navikt/aksel-icons';
import { getColorTheme } from './ColorThemes';
import InnerHandle from './InnerHandle';

interface BaseNodeProps {
    title: string;
    leftHandles?: VariableDeclaration[];
    rightHandles?: VariableDeclaration[];
    innerFlowLeftHandles?: VariableDeclaration[];
    innerFlowRightHandles?: VariableDeclaration[];
    selected: boolean;
    iconId: string;
    type: string;
    isValidConnection: (connection: Connection) => boolean;
}

export const BaseNode: React.FC<BaseNodeProps> = ({
    title,
    leftHandles,
    rightHandles,
    innerFlowLeftHandles,
    innerFlowRightHandles,
    selected,
    iconId,
    type,
    isValidConnection,
}) => {
    const maxHandles =
        !leftHandles || !rightHandles ? 0 : Math.max(leftHandles.length, rightHandles.length);

    const dynamicHeight = `${maxHandles > 2 ? maxHandles * 2 : 5}rem`;

    const isInnerFlow = type === 'innerflow';

    const operationDesign = `${getOperationBgColors(selected)} w-20`;

    const innerFlowDesign = `w-96 min-h-40 ${getInnerFlowBgColors(selected)}`;

    const sidebarColors = getSideBarColor(selected);
    return (
        <div className="">
            <div className={`flex justify-center ${selected ? '' : ''}`}>
                {/* Left handles */}
                <div className="flex justify-center flex-col">
                    {leftHandles?.map((handle, index) => (
                        <CustomHandle
                            key={index}
                            position={Position.Left}
                            id={handle.key}
                            displayText={handle.displayText}
                            isArray={false}
                            dataType={handle.dataType}
                            isValidConnection={isValidConnection}
                        />
                    ))}
                </div>

                <div className="relative flex flex-col items-center">
                    {/* Title centered above the rounded box */}
                    <div className="absolute top-[-2.5rem] left-1/2 -translate-x-1/2 text-center text-xl px-2 whitespace-nowrap">
                        <span className="relative flex flex-row">
                            {/* {renderIcon(
                                iconId,
                                colorPalette.iconColor,
                                colorPalette.iconStrokeColor,
                                false
                            )} */}
                            <p className={``}>{title}</p>
                        </span>
                    </div>

                    {/* Operation box */}
                    <div
                        style={{ height: dynamicHeight }}
                        className={`relative ${isInnerFlow ? innerFlowDesign : operationDesign} rounded-2xl flex flex-col items-center justify-center border border-black p-2`}>
                        {renderIcon(iconId, isInnerFlow)}

                        {/* Innerflow custom styles */}
                        {isInnerFlow && (
                            // side bars
                            <>
                                {/* Left Side Bar */}
                                <div
                                    style={{ height: '100%' }}
                                    className={`${sidebarColors} w-10 absolute left-0 top-0 border-r border-black rounded-l-2xl flex items-center`}></div>

                                <div className="absolute left-10">
                                    {innerFlowLeftHandles?.map((handle, index) => (
                                        <InnerHandle
                                            key={index}
                                            position={Position.Right}
                                            id={handle.key}
                                            displayText={handle.displayText}
                                            isArray={false}
                                            dataType={handle.dataType}
                                            isValidConnection={isValidConnection}
                                        />
                                    ))}
                                </div>
                                {/* Right side bar */}
                                <div className="absolute right-10">
                                    {innerFlowRightHandles?.map((handle, index) => (
                                        <InnerHandle
                                            key={index}
                                            position={Position.Left}
                                            id={handle.key}
                                            displayText={handle.displayText}
                                            isArray={false}
                                            dataType={handle.dataType}
                                            isValidConnection={isValidConnection}
                                        />
                                    ))}
                                </div>
                                <div
                                    style={{ height: '100%' }}
                                    className={`${sidebarColors} w-10 absolute right-0 top-0 border-l border-black rounded-r-2xl`}></div>
                            </>
                        )}
                    </div>
                </div>

                {/* Right handles */}
                <div className="flex justify-center flex-col">
                    {rightHandles?.map((handle, index) => (
                        <CustomHandle
                            key={index}
                            position={Position.Right}
                            id={handle.key}
                            displayText={handle.displayText}
                            isArray={false}
                            dataType={handle.dataType}
                            isValidConnection={isValidConnection}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const renderIcon = (iconId: string, placeOnTop = false, isHidden = false) => {
    const outlineWidth = '0.5px';

    const colorPalette = getColorTheme();
    const iconColor = colorPalette.iconColor;
    const iconStrokeColor = colorPalette.iconStrokeColor;

    const placeOnTopDesign = placeOnTop ? 'absolute top-4' : '';
    if (iconId === 'ChevronRightDoubleCircleFillIcon') {
        return <ChevronRightDoubleCircleFillIcon title="a11y-title" fontSize="40px" />;
    } else {
        return (
            <span
                className={`${placeOnTopDesign} material-symbols-outlined text-left text-[30px] ${iconColor} ${isHidden ? 'hidden' : ''}`}
                style={{
                    textShadow: `
                    -${outlineWidth} -${outlineWidth} 0 ${iconStrokeColor},
                    ${outlineWidth} -${outlineWidth} 0 ${iconStrokeColor},
                    -${outlineWidth} ${outlineWidth} 0 ${iconStrokeColor},
                    ${outlineWidth} ${outlineWidth} 0 ${iconStrokeColor}
                `,
                }}>
                {iconId}
            </span>
        );
    }
};
function getSideBarColor(selected: boolean) {
    const colorPalette = getColorTheme();
    return selected
        ? colorPalette.InnerFlowBgColorSideBarsSelected
        : colorPalette.InnerFlowBgColorSideBarsDefault;
}

function getInnerFlowBgColors(selected: boolean) {
    const colorPalette = getColorTheme();
    return selected ? colorPalette.InnerFlowBgColorSelected : colorPalette.InnerFlowBgColorDefault;
}

function getOperationBgColors(selected: boolean) {
    const colorPalette = getColorTheme();
    return selected ? colorPalette.OperationBgColorselected : colorPalette.OperationBgColorDefault;
}
