export declare module Characters {

    type GetCharacterResponse = {
        characters: Array<Character>;
        currentPage: number;
        pageSize: number;
        totalCharacters: number;
    }
    export type Character = {
        id: number;
        name: string;
        images: string[];
    }
}


