import React from 'react';
import { Box, Dropdown, VStack } from '@navikt/ds-react';
import { MenuConfig, menuConfigs } from './config';
import { ChevronRightDoubleCircleFillIcon } from '@navikt/aksel-icons';

interface MathNodeListProps {
    configKey: string;
    isVerticalStack?: boolean;
    onClickHandler: (type: string, data: any) => void;
}

const TopMenuList: React.FC<MathNodeListProps> = ({
    configKey,
    isVerticalStack = false,
    onClickHandler,
}) => {
    const menuConfig = menuConfigs[configKey];

    const onDragStart = (event: React.DragEvent<HTMLSpanElement>, menuItem: MenuConfig) => {
        event.dataTransfer.setData('application/node-type', menuItem.nodeType);
        // const data = { inputType,label,icon };
        const data = { ...menuItem };
        event.dataTransfer.setData('application/reactflow', JSON.stringify(data));
        event.dataTransfer.effectAllowed = 'move';
    };

    const renderIcon = (icon: string) => {
        if (icon === 'ChevronRightDoubleCircleFillIcon') {
            return <ChevronRightDoubleCircleFillIcon title="a11y-title" fontSize="25px" />;
        } else {
            return <span className="material-symbols-outlined text-left">{icon}</span>;
        }
    };

    // console.log(menuConfig);
    return (
        <VStack gap="2" align="start">
            {menuConfig.map((menuItem, index) => (
                <Dropdown.Menu.List.Item key={index} as="div">
                    <Box
                        key={index}
                        onDragStart={(event) => onDragStart(event, menuItem)}
                        onClick={() => onClickHandler(menuItem.nodeType, menuItem)}
                        draggable
                        as={'div'}
                        borderRadius="large"
                        className={'w-60 flex items-center my-0.5'}>
                        <span className="flex items-center pr-2">{renderIcon(menuItem.icon)}</span>
                        <span className="">{menuItem.label}</span>
                    </Box>
                </Dropdown.Menu.List.Item>
            ))}
        </VStack>
    );
};

export default TopMenuList;
