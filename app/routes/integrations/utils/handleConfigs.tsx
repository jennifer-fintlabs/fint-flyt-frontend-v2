import { Position } from "reactflow";

export interface HandleConfig {
    position: Position;
    labelText: string;
    id: string;
    icon: string;
    className?: string;
    isArray?: boolean;
    isOptional?: boolean;
}

const handleConfigs: { [key: string]: HandleConfig[] } = {
    default: [
        {
            position: Position.Left,
            labelText: "Samling",
            id: "4",
            icon: "text_fields",
            isArray: true,
        },
        {
            position: Position.Right,
            labelText: "Element",
            className: "left-10",
            id: "3",
            icon: "text_fields",
        },
    ],
    "subflow-reduce": [
        {
            position: Position.Left,
            labelText: "Samling",
            id: "4",
            icon: "tag",
            isArray: true,
        },
        {
            position: Position.Right,
            labelText: "Element A",
            className: "left-10 pb-10",
            id: "400",
            icon: "tag",
        },
        {
            position: Position.Right,
            labelText: "Element B",
            className: "left-10 pt-10",
            id: "500",
            icon: "tag",
        },
    ]
};

export const handleConfigsRight: { [key: string]: HandleConfig[] } = {

    "subflow-map": [
        {
            position: Position.Left,
            labelText: "Nytt element",
            id: "4",
            icon: "data_object",
        },
        {
            position: Position.Right,
            labelText: "Ny samling",
            className: "left-10",
            id: "400",
            icon: "data_object",
            isArray: true,
        }
    ],
    "subflow-filter": [
        {
            position: Position.Left,
            labelText: "Skal være med",
            id: "4",
            icon: "toggle_on",
        },
        {
            position: Position.Right,
            labelText: "Filtert samling",
            className: "left-10",
            id: "400",
            icon: "text_fields",
            isArray: true,
        }
    ],
    "subflow-reduce": [
        {
            position: Position.Left,
            labelText: "Sammenslått verdi",
            id: "4",
            icon: "text_fields",
        },
        {
            position: Position.Right,
            labelText: "Sammenslått verdi",
            className: "left-10",
            id: "400",
            icon: "text_fields",
        }
    ],
    "subflow-find-first": [
        {
            position: Position.Left,
            labelText: "Betingelse",
            id: "4",
            icon: "toggle_on",
        },
        {
            position: Position.Right,
            labelText: "Funnet element",
            className: "left-10 ",
            id: "400",
            icon: "text_fields",
            isOptional: true,
        }
    ]
};

export default handleConfigs;
