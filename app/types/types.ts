export interface DataType {
    category: Category;
    // getCategory(): string;
    // getDisplayText(): string;
}

export interface VariableDeclaration<T extends DataType> {
    order: number;
    key: string;
    displayText: DisplayText;
    dataType: T;
}
export interface DisplayText {
    name: string;
    description?: string;
}
type Category =
    | 'PARAMETERIZED'
    | 'STREAM'
    | 'MAP'
    | 'LIST'
    | 'REFERENCE'
    | 'SYNCHRONOUS_REQUEST'
    | 'RECORD'
    | 'STRING'
    | 'INTEGER'
    | 'DECIMAL'
    | 'BOOLEAN';

export enum CategoryType {
    PARAMETERIZED = 'PARAMETERIZED',
    STREAM = 'STREAM',
    MAP = 'MAP',
    LIST = 'LIST',
    REFERENCE = 'REFERENCE',
    SYNCHRONOUS_REQUEST = 'SYNCHRONOUS_REQUEST',
    RECORD = 'RECORD',
    STRING = 'STRING',
    INTEGER = 'INTEGER',
}

export enum PrimitiveType {
    TEXT = 'Text',
    INTEGER = 'Integer',
    DECIMAL = 'Decimal number',
    BOOLEAN = 'Boolean',
}

export interface ParameterizedType extends DataType {
    category: CategoryType.PARAMETERIZED;
    typeParameterId: string;
}

export interface StreamType extends DataType {
    category: CategoryType.STREAM;
    elementType: DataType;
}

export interface MapType extends DataType {
    category: CategoryType.MAP;
    keyType: DataType;
    valueType: DataType;
    constraints: CollectionConstraints;
}

// Min max verdier for begrensninger
export interface CollectionConstraints {}

export interface ListType extends DataType {
    category: CategoryType.LIST;
    elementType: DataType;
    constraints: CollectionConstraints;
}

// SynchronousRequestType
export interface SynchronousRequestType extends DataType {
    category: CategoryType.SYNCHRONOUS_REQUEST;
    dataType: DataType;
    responseType: DataType;
    timeout?: Date;
}
export interface ReferenceType extends DataType {
    category: CategoryType.REFERENCE;
    referenceContextId: string; // ???
    dataType: DataType;
}

// RecordType
export interface RecordType extends DataType {
    category: CategoryType.RECORD;
    recordTypeDeclarationId: string; // long - consider using BigInt, postponed, discuss it later, might introduce bigint
}
