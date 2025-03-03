import React from 'react';
import { Box, Button, Dropdown, HStack } from '@navikt/ds-react';
import TopMenuList from './TopMenuList';
import { ChevronDownIcon } from '@navikt/aksel-icons';
import { DataType } from '~/types/types';
import mockDataTypes from '../../../api/mock-flyt2-datatypes.json';
import mockOperationDeclarations from '../../../api/mock-flyt2-operation-declarations.json';
import MenuListDataTypes from './MenuListDataTypes';
import { OperationDeclaration } from '../types/Operation';
import OperationsList from './OperationsList';
interface TopMenuProps {
    onClickHandler: (nodeType: string, data: any) => void;
}

const TopMenu: React.FunctionComponent<TopMenuProps> = ({ onClickHandler }) => {
    const ChevronDown = <ChevronDownIcon title="chevron down" fontSize="1.5rem" />;

    const CustomDropDown = ({
        title,
        configKey,
        dataTypes,
        operationDeclarations,
    }: {
        title: string;
        configKey?: string;
        dataTypes?: DataType[];
        operationDeclarations?: OperationDeclaration[];
    }) => {
        return (
            <Dropdown>
                <Button
                    icon={ChevronDown}
                    iconPosition="right"
                    variant="tertiary"
                    as={Dropdown.Toggle}>
                    {title}
                </Button>
                <Dropdown.Menu placement="bottom-start">
                    <Dropdown.Menu.List>
                        {/* DataTypes list */}
                        {dataTypes && (
                            <MenuListDataTypes
                                dataTypes={mockDataTypes as DataType[]}
                                onClickHandler={onClickHandler}
                            />
                        )}

                        {/* Operations List */}
                        {operationDeclarations && (
                            <OperationsList
                                operationDeclarations={
                                    mockOperationDeclarations as OperationDeclaration[]
                                }
                                onClickHandler={onClickHandler}
                            />
                        )}
                        {/* The rest of the menu items */}
                        {configKey && (
                            <TopMenuList configKey={configKey} onClickHandler={onClickHandler} />
                        )}
                    </Dropdown.Menu.List>
                </Dropdown.Menu>
            </Dropdown>
        );
    };

    return (
        <div className="grid gap-6 pb-2 pt-2">
            <Box
                id={'flow-buttons'}
                background={'surface-default'}
                padding="1"
                borderRadius={'small'}
                borderWidth="2"
                borderColor={'border-subtle'}>
                <HStack gap="0">
                    <CustomDropDown title="Actions" configKey="channelNodes" />
                    <CustomDropDown title="Constants" configKey="staticValueNodes" />
                    <CustomDropDown title="Collections" configKey="subFlowNodes" />
                    <CustomDropDown title="Conversions" configKey="mathNodes" />
                    <CustomDropDown title="Text Converstions" configKey="textConversionNodes" />
                    <CustomDropDown title="DataTypes" dataTypes={mockDataTypes as DataType[]} />
                    <CustomDropDown
                        title="Operations"
                        operationDeclarations={mockOperationDeclarations as OperationDeclaration[]}
                    />
                    {/* <Dropdown>
                        <Button icon={ChevronDown} iconPosition="right" variant="tertiary" as={Dropdown.Toggle}>Example</Button>
                        <Dropdown.Menu placement="bottom-start">
                                <Dropdown.Menu.GroupedList>
                                    <TopMenuList configKey={"channelNodes"}/>
                                </Dropdown.Menu.GroupedList>
                                
                                <ExpansionCard className="pt-2 border-0" size="small" aria-label="Small-variant">
                                    <ExpansionCard.Header style={{ border: '0px'}}>
                                        <ExpansionCard.Title as="h4" size="small">
                                            Without Border
                                        </ExpansionCard.Title>
                                    </ExpansionCard.Header>
                                    <ExpansionCard.Content style={{ border: '0px'}}>
                                        <Dropdown.Menu.GroupedList>
                                            <TopMenuList configKey={"mathNodes"}/>
                                        </Dropdown.Menu.GroupedList>
                                    </ExpansionCard.Content>
                                </ExpansionCard>
                                <Dropdown.Menu.Divider />

                                <Dropdown.Menu.List>
                                    <Dropdown.Menu.List.Item>
                                        <Search label="Søk alle NAV sine sider" variant="secondary" />
                                    </Dropdown.Menu.List.Item>
                                </Dropdown.Menu.List>
                        </Dropdown.Menu>
                    </Dropdown> */}
                </HStack>
            </Box>
        </div>
    );
};

export default TopMenu;
