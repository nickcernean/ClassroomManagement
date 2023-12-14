import { CharactersModule } from "@/types";

class Mappers {
    static mapToCharacterObject<T extends CharactersModule.Character>(source: T): CharactersModule.Character {
        const { id, name, images } = source;

        const mappedObject: CharactersModule.Character = {
            id,
            name,
            images,
        };

        return mappedObject;
    }

}

export default Mappers;