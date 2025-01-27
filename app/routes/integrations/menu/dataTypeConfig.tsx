export interface MenuConfig {
    nodeType: string;
    inputType: string;
    categoryType: string;
    label: string;
    icon: string;
    hasToolbar?: boolean;
}

export const menuConfigs: MenuConfig[] = [
    {
        nodeType: 'static',
        inputType: 'text',
        label: 'String',
        icon: 'text_fields',
        categoryType: 'text',
    },
    {
        nodeType: 'static',
        inputType: 'number',
        label: 'Number',
        icon: 'numbers',
        categoryType: 'integer',
    },
    {
        nodeType: 'static',
        inputType: 'decimal',
        label: 'Decimal',
        icon: 'decimal_increase',
        categoryType: 'decimal',
    },
    {
        nodeType: 'static',
        inputType: 'boolean',
        label: 'Boolean',
        icon: 'toggle_on',
        categoryType: 'boolean',
    },
    {
        nodeType: 'openObject',
        inputType: 'record',
        label: 'Open Object 3',
        icon: 'data_object',
        categoryType: 'record',
    },
];
