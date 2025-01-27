import { DataType } from '~/types/types';
import DataTypeComponent from './UI/DataType';
import { DisplayNameComponent } from './UI/DisplayName';
import { Handle, Position } from 'reactflow';

interface NodeData {
    data: DataType;
    displayName: string;
}

interface VariableNodeProps {
    data: NodeData;
}

function Saksnumre({ data }: { data: NodeData }) {
    return (
        <>
            {/* <p className="text-sm absolute top-[-16px]">Variable Node med tekst</p> */}
            <div className="pt-5">
                <div className=" flex flex-row gap-2">
                    <div className="flex">
                        <div className="flex">
                            <div className="absolute text-sm top-[0px]">Steg 1</div>
                            <div
                                className={`
                    flex p-[5px] border border-gray-400 
                    rounded-tr-md rounded-br-md 
                    bg-white
                `}>
                                <label className="bg-purple-200 p-3">
                                    {'➡ En strøm av '}
                                    <span className="bg-blue-200">saksnumre (tekst)</span>{' '}
                                </label>
                            </div>
                        </div>
                        {/* <div className="flex">
                            <div className="absolute text-sm top-[0px]">Steg 2</div>

                            <div
                                className={`
                    flex p-[5px] border border-gray-400 
                    rounded-tr-md rounded-br-md 
                    bg-white
                    border-l-0 -left-1  
                `}>
                                <label className="bg-purple-200 p-3">
                                    {' 🔄 For hvert '}
                                    <span className="bg-blue-200">saksnummer (tekst)</span>
                                    {' gjør følgende '}
                                </label>
                            </div>
                        </div> */}
                    </div>
                    {/* <DisplayNameComponent displayName={data.displayName}></DisplayNameComponent> */}
                </div>
            </div>
            <Handle
                type={'source'}
                position={Position.Right}
                id={'123'}
                className="absolute !top-[50px] !z-10 !w-4 !h-4 !bg-black"
            />
        </>
    );
}

function Nummre({ data }: { data: NodeData }) {
    return (
        <>
            {/* <p className="text-sm absolute top-[-16px]">Variable Node med tekst</p> */}
            <div className="pt-5">
                <div className=" flex flex-row gap-2">
                    <div className="flex">
                        <div className="flex">
                            <div className="absolute text-sm top-[0px]">Steg 1</div>
                            <div
                                className={`
                    flex p-[5px] border border-gray-400 
                    rounded-tr-md rounded-br-md 
                    bg-white
                `}>
                                <label className="bg-purple-200 p-3">
                                    {'➡ Mottar en strøm av '}
                                    <span className="bg-yellow-100">SaksId (tall)</span>{' '}
                                </label>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="absolute text-sm top-[0px]">Steg 2</div>

                            <div
                                className={`
                    flex p-[5px] border border-gray-400 
                    rounded-tr-md rounded-br-md 
                    bg-white
                    border-l-0 -left-1  
                `}>
                                <label className="bg-purple-200 p-3">
                                    {' 🔄 For hver '}
                                    <span className="bg-yellow-100">SaksId (tall)</span>
                                    {' gjør følgende '}
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* <DisplayNameComponent displayName={data.displayName}></DisplayNameComponent> */}
                </div>
            </div>
            <Handle
                type={'source'}
                position={Position.Right}
                id={'123'}
                className="absolute !top-[50px] !z-10 !w-4 !h-4 !bg-black"
            />
        </>
    );
}

const VariableNode: React.FC<VariableNodeProps> = ({ data }) => {
    if (data.displayName === 'Saksnummer') return <Saksnumre data={data}></Saksnumre>;
    if (data.displayName === 'SaksId') return <Nummre data={data}></Nummre>;
    return (
        <>
            <p className="text-sm absolute top-[-16px]">Variable Node</p>
            <div className="bg-blue-200 p-2 rounded border border-gray-400">
                <div className=" flex flex-row gap-2">
                    <DataTypeComponent data={data.data} />
                    <DisplayNameComponent displayName={data.displayName}></DisplayNameComponent>
                </div>
            </div>
            <Handle
                type={'source'}
                position={Position.Right}
                id={'123'}
                className="absolute !right-0.5 !z-10 !w-3 !h-3 !bg-teal-500"
            />
        </>
    );
};

export default VariableNode;
