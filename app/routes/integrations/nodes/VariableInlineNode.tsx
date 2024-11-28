import { DataType } from '~/types/types';

interface VariableInlineNodeProps {
    data: DataType;
}

const VariableInlineNode: React.FC<VariableInlineNodeProps> = ({ data }) => {
    return (
        <>
            <p className="text-sm">Variable Inline Node</p>
            <div className="p-4 border rounded border-gray-400 flex flex-row gap-2">
                <label className="p-2 border rounded border-gray-400 ">{data.category}</label>
                {/* display the correct input field based on data type */}
            </div>
        </>
    );
};

export default VariableInlineNode;
