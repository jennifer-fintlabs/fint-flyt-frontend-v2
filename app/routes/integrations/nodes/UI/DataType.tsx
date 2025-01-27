import { CategoryType, DataType, ListType, MapType, StreamType } from '~/types/types';

interface DataTypeNodeProps {
    data: DataType;
    isChild?: boolean;
    parentCategory?: string;
}

const getMapLabel = (data: MapType): string => {
    return `${data.keyType.category} -> ${data.valueType.category}`;
};

// SKal ligge inn i en handle (er ikke node alene)
const DataTypeComponent: React.FC<DataTypeNodeProps> = ({
    data,
    isChild = false,
    parentCategory = '',
}) => {
    const renderChildElement = () => {
        if (parentCategory === CategoryType.MAP) return null; // otherwise we will get an inifite loop

        switch (data.category) {
            case CategoryType.STREAM:
                return <DataTypeComponent isChild data={(data as StreamType).elementType} />;
            case CategoryType.LIST:
                return <DataTypeComponent isChild data={(data as ListType).elementType} />;
            case CategoryType.MAP:
                return (
                    <DataTypeComponent
                        isChild
                        parentCategory={CategoryType.MAP}
                        data={data as MapType}
                    />
                );
            default:
                return null;
        }
    };

    const label =
        parentCategory === CategoryType.MAP ? getMapLabel(data as MapType) : data.category;

    return (
        <div className="flex">
            <div className="flex">
                <div
                    className={`
                    flex p-[5px] border border-gray-400 
                    rounded-tr-md rounded-br-md 
                    bg-white
                    ${isChild ? 'border-l-0 -left-1 last:bg-purple-200 last:font-bold' : ''}
                `}>
                    <label className="bg-purple-200 p-3">{label}</label>
                </div>
                {renderChildElement()}
            </div>
        </div>
    );
};

export default DataTypeComponent;
