export type TItem = {
    type: Types
    name: string
}


export interface IDropdown {
    items: TItem[]
}

export enum Types {
    'summary' = 'summary',
    'education' = 'education',
}