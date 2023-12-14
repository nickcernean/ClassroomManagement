export declare module CharactersModule {

    type GetCharacterResponse = {
        characters: Array<Character>;
        currentPage: number;
        pageSize: number;
        totalCharacters: number;
    }
    export type Character = {
        id: number;
        name: string;
        rank?: string;
        images: string[];
    }
}


