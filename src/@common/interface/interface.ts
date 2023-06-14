export type TItem = {
    type: Types
    name: string
}


export interface IDropdown {
    items: TItem[]
}

export enum Types {
    'heading' = 'heading',
    'line' = 'line',
    'summary' = 'summary',
    'education' = 'education',
    'project' = 'project',
    'basic_info' = 'basic_info',
    'picture' = 'picture'
}