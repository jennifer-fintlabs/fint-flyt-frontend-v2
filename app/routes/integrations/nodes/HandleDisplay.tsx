import { CategoryType, DataType } from '~/types/types';
import DataTypeComponent from './UI/DataType';
import { DisplayName } from './UI/DisplayName';
import { Handle, Position } from 'reactflow';
import { getIcon } from './utils';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

interface HandleDisplayProps {
    category: string;
    displayName: string;
    position: Position;
    typeParameterId?: string;
}

function HandleIcon({ icon }: { icon: string }) {
    return (
        <div className="flex items-center justify-center bg-white w-6 h-[calc(1.75rempx)] relative rounded-full">
            <span
                className={`material-symbols-rounded ${icon === 'text_fields' ? 'text-[1.1rem]' : 'text-[1.3rem]'} leading-none flex items-center justify-center`}
                style={{
                    lineHeight: 1,
                }}>
                {icon}
            </span>
        </div>
    );
}

const HandleDisplay: React.FC<HandleDisplayProps> = ({
    position,
    category,
    displayName,
    typeParameterId,
}) => {
    const icon = getIcon(category);

    const positioning = position === Position.Left ? 'mr-4' : '';
    const parameterizedClasses = typeParameterId ? 'border-red-600 bg-red-100' : '';
    const arrowPosition = position === Position.Left ? 'right-7' : 'right-3';
    return (
        <>
            {typeParameterId && (
                <div className={`flex flex-row justify-content items-center`}>
                    <select
                        className={`flex items-center text-sm h-8 mx-2 border rounded-2xl px-4 pr-7 mr-2 ${positioning} ${parameterizedClasses} appearance-none`}>
                        <option value="">Velg {typeParameterId}</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                    <span
                        className={`material-symbols-outlined flex justify-center flex-col pointer-events-none text-gray-500 absolute ${arrowPosition}`}>
                        keyboard_arrow_down
                    </span>
                </div>
            )}
            {!typeParameterId && (
                <div
                    className={`flex bg-[#FFE6C1] item-center z-20 justify-center flex-row text-sm mx-2 h-8 border rounded-2xl pl-2 px-2 mr-2 ${positioning} ${parameterizedClasses}`}>
                    <HandleIcon icon={icon}></HandleIcon>
                    <DisplayName displayName={displayName}></DisplayName>
                </div>
            )}
        </>
    );
};

export default HandleDisplay;
