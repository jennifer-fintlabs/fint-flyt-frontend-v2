import React from 'react';
import { Box, HStack, VStack, Dropdown } from "@navikt/ds-react";
import {MenuConfig, menuConfigs} from './config';

interface MathNodeListProps {
  configKey: string;
  isVerticalStack?: boolean;
}

const TopMenuList: React.FC<MathNodeListProps> = ({ configKey, isVerticalStack = false }) => {
    const menuConfig = menuConfigs[configKey];

    const onDragStart = (event: React.DragEvent<HTMLSpanElement>, menuItem:MenuConfig) => {
        event.dataTransfer.setData('application/node-type', menuItem.nodeType);
        // const data = { inputType,label,icon };
        const data = { ...menuItem };
        event.dataTransfer.setData('application/reactflow', JSON.stringify(data));
        event.dataTransfer.effectAllowed = 'move';
    };

    const CustomimzableStack = ({children}: {children: React.ReactNode }) => {
        return isVerticalStack ? <VStack gap="2" align="start">{children}</VStack> : <HStack gap="2" align="start">{children}</HStack>
    }
    return (

        <CustomimzableStack>
            {menuConfig.map((menuItem, index) => (
               <Dropdown.Menu.GroupedList.Item as="div">

                <Box
                    key={index}
                    onDragStart={(event) => onDragStart(event, menuItem)}
                    draggable
                    className={"w-40 flex items-center rounded-lg bg-gray-200"}
                    as={"div"}
                    borderRadius="large"
                >
                    <span className="w-1/4">
                        <span className="material-symbols-outlined">
                            {menuItem.icon}
                        </span>
                    </span>
                    <span>{menuItem.label}</span>
                </Box>
                </Dropdown.Menu.GroupedList.Item>
            ))}
        </CustomimzableStack>
    );
};

export default TopMenuList;
