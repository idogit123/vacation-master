type PetType = "Dog" | "Cat"

export default class Pet {
    name: string
    type: PetType
    age: number

    constructor(name: string, type: PetType, age: number) {
        this.name = name
        this.type = type
        this.age = age
    }
}