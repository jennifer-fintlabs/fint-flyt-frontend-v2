import { ChevronRightDoubleCircleFillIcon } from '@navikt/aksel-icons';
import React from 'react';
import { Connection, Position } from 'reactflow';
import nodeConfig from '~/routes/integrations/nodes/config';
import CustomHandle from './CustomHandle';
import { InnerFlowOperationDeclaration, OperationDeclaration } from '../types/Operation';
import { BaseNode } from './BaseNode';
import { getDisplayText, getIconId, getHandles } from './utils';

interface Props {
    id: string;
    type: string;
    selected: boolean;
    data: InnerFlowOperationDeclaration;
}

const InnerFlowNode: React.FC<Props> = ({ data, type, selected }) => {
    const displayText = getDisplayText(type, data);
    const iconId = getIconId(type, data);
    const { leftHandles, rightHandles, innerFlowLeftHandles, innerFlowRightHandles } = getHandles(
        type,
        data
    );

    const isValidConnection = (connection: Connection) => {
        console.log('Connection Attempt:', connection);
        return true;
    };

    return (
        <BaseNode
            title={displayText}
            leftHandles={leftHandles}
            rightHandles={rightHandles}
            innerFlowLeftHandles={innerFlowLeftHandles}
            innerFlowRightHandles={innerFlowRightHandles}
            selected={selected}
            iconId={iconId}
            type={type}
            isValidConnection={isValidConnection}></BaseNode>
    );
};

export default InnerFlowNode;
