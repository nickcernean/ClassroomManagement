import { Characters } from "@/types";

class Mappers {
    static mapToCharacterObject<T extends Characters.Character>(source: T): Characters.Character {
        const { id, name, images } = source;

        const mappedObject: Characters.Character = {
            id,
            name,
            images,
        };

        return mappedObject;
    }

}

export default Mappers;