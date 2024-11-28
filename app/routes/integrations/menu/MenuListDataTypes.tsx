import React from 'react';
import { Box, Dropdown, VStack } from '@navikt/ds-react';
import { MenuConfig, menuConfigs } from './dataTypeConfig';
import { ChevronRightDoubleCircleFillIcon } from '@navikt/aksel-icons';
import { DataType } from '~/types/types';

interface MenuListDataTypesProps {
    dataTypes: DataType[];
    onClickHandler: (type: string, data: any) => void;
}

const MenuListDataTypes: React.FC<MenuListDataTypesProps> = ({ dataTypes, onClickHandler }) => {
    // const menuConfig = menuConfigs[configKey];
    // console.log(dataTypes);
    // console.log(menuConfigs);
    // const onDragStart = (event: React.DragEvent<HTMLSpanElement>, menuItem: MenuConfig) => {
    //     event.dataTransfer.setData('application/node-type', menuItem.nodeType);
    //     // const data = { inputType,label,icon };
    //     const data = { ...menuItem };
    //     event.dataTransfer.setData('application/reactflow', JSON.stringify(data));
    //     event.dataTransfer.effectAllowed = 'move';
    // };

    const renderIcon = (icon: string) => {
        if (icon === 'ChevronRightDoubleCircleFillIcon') {
            return <ChevronRightDoubleCircleFillIcon title="a11y-title" fontSize="25px" />;
        } else {
            return <span className="material-symbols-outlined text-left">{icon}</span>;
        }
    };

    return (
        <VStack gap="2" align="start">
            {dataTypes.map((dataType, index) => {
                const dataTypeConfig = menuConfigs.find(
                    (config) => dataType.category.toLocaleLowerCase() === config.categoryType
                );

                const icon = dataTypeConfig ? dataTypeConfig.icon : '';

                return (
                    <Dropdown.Menu.List.Item key={index} as="div">
                        <Box
                            key={index}
                            // onDragStart={(event) => onDragStart(event, menuItem)}
                            onClick={() =>
                                onClickHandler(
                                    dataTypeConfig ? dataTypeConfig.nodeType : '',
                                    dataTypeConfig
                                )
                            }
                            draggable
                            as={'div'}
                            borderRadius="large"
                            className={'w-60 flex items-center my-0.5'}>
                            <div className="flex w-8 items-center">
                                <span className="material-symbols-outlined">{icon}</span>
                            </div>
                            <div className="">{dataType.category}</div>
                        </Box>
                    </Dropdown.Menu.List.Item>
                );
            })}
        </VStack>
    );
};

export default MenuListDataTypes;
