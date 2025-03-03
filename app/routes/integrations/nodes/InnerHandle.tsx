import { Connection, Handle, Position } from 'reactflow';
import VariableInlineNode from './VariableInlineNode';
import HandleOptions from './HandleOptions';
import HandleDisplay from './HandleDisplay';
import { DataType, RecordType } from '~/types/types';

interface HandleProps {
    position: Position;
    id?: string;
    displayText: string;
    className?: string;
    dataType?: DataType;
    icon?: string;
    isArray?: boolean;
    isOptional?: boolean; // new prop
    isValidConnection?: (connection: Connection) => boolean;
}

export default function CustomHandle({
    position = Position.Right,
    dataType,
    id = '',
    displayText = '',
    className = '',
    icon = '',
    isArray,
    isOptional,
    isValidConnection,
}: HandleProps) {
    function labelPlacement() {
        if (position == Position.Right) {
            return 'flex-row';
        }
        if (position == Position.Left) {
            return 'flex-row-reverse';
        }
    }

    return (
        <div className={`flex gap-2 pb-1 items-center relative ${labelPlacement()} ${className}`}>
            <div className={`relative bg-black`}>
                <Handle
                    type={position == Position.Right ? 'source' : 'target'}
                    position={position}
                    className={
                        position == Position.Left
                            ? 'absolute z-10 !w-4 !h-4 !left-[-8px] !bg-orange-300 !border !border-black'
                            : 'absolute z-10 !w-4 !h-4 !left-[-8px] !bg-amber-700 !border !border-black'
                    }
                    id={id}
                    key={id}
                    isValidConnection={isValidConnection}
                />
            </div>

            <HandleDisplay
                position={position}
                category={
                    dataType
                        ? dataType.category === 'RECORD'
                            ? (dataType as RecordType).recordTypeDeclarationId
                            : dataType.category
                        : 'STRING'
                }
                displayName={displayText}
            />
        </div>
    );
}
