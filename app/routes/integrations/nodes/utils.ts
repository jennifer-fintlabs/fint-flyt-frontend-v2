import {
    OperationDeclaration,
    InnerFlowOperationDeclaration,
    VariableDeclaration,
} from '../types/Operation';

export function getIcon(inputType: string) {
    switch (inputType) {
        case 'STRING':
            return 'text_fields';
        case 'INTEGER':
            return 'numbers';
        case 'DECIMAL':
            return 'decimal_increase';
        case 'TIME':
            return 'schedule';
        case 'DATE':
            return 'calendar_today';
        case 'DATETIME':
            return 'calendar_clock';
        case 'BOOLEAN':
            return 'toggle_on';
        case 'LIST':
            return 'list_alt';
        default:
            return 'text_fields';
    }
}

export function getHandles(
    type: string,
    data: OperationDeclaration | InnerFlowOperationDeclaration
) {
    let leftHandles: VariableDeclaration[] = [];
    let rightHandles: VariableDeclaration[] = [];
    let innerFlowLeftHandles: VariableDeclaration[] = [];
    let innerFlowRightHandles: VariableDeclaration[] = [];

    if (type === 'innerflow') {
        leftHandles = (data as InnerFlowOperationDeclaration).outerOperation.operationVariables
            .inputVariables;
        rightHandles = (data as InnerFlowOperationDeclaration).outerOperation.operationVariables
            .outputVariables;

        innerFlowLeftHandles = (data as InnerFlowOperationDeclaration).innerFlowVariables
            .inputVariables;
        innerFlowRightHandles = (data as InnerFlowOperationDeclaration).innerFlowVariables
            .outputVariables;
    }

    if (type === 'operation') {
        leftHandles = (data as OperationDeclaration).operationVariables.inputVariables;
        rightHandles = (data as OperationDeclaration).operationVariables.outputVariables;
    }
    // sort handles
    leftHandles = leftHandles ? leftHandles.sort((a, b) => a.order - b.order) : leftHandles;
    rightHandles = rightHandles ? rightHandles.sort((a, b) => a.order - b.order) : rightHandles;

    innerFlowLeftHandles = innerFlowLeftHandles
        ? innerFlowLeftHandles.sort((a, b) => a.order - b.order)
        : innerFlowLeftHandles;
    innerFlowRightHandles = innerFlowRightHandles
        ? innerFlowRightHandles.sort((a, b) => a.order - b.order)
        : innerFlowRightHandles;
    return { leftHandles, rightHandles, innerFlowLeftHandles, innerFlowRightHandles };
}

export function getDisplayText(
    type: string,
    data: OperationDeclaration | InnerFlowOperationDeclaration
) {
    let text = '';
    if (type === 'innerflow') {
        text = (data as InnerFlowOperationDeclaration).outerOperation.displayText;
    }

    if (type === 'operation') {
        text = (data as OperationDeclaration).displayText;
    }
    return text;
}

export function getIconId(
    type: string,
    data: OperationDeclaration | InnerFlowOperationDeclaration
) {
    let iconId = '';
    if (type === 'innerflow') {
        iconId = (data as InnerFlowOperationDeclaration).outerOperation.iconId;
    }

    if (type === 'operation') {
        iconId = (data as OperationDeclaration).iconId;
    }
    return iconId;
}
