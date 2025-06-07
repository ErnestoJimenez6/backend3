import { faker } from '@faker-js/faker';

export const generateMockPets = (count = 1) => {
    const pets = [];

    for (let i = 0; i < count; i++) {
        pets.push({
            name: faker.animal.dog(),
            specie: faker.animal.type(),
            birthDate: faker.date.past({ years: 10 }),
            age: faker.number.int({ min: 1, max: 15 }),
            adopted: faker.datatype.boolean(),
            owner: faker.helpers.arrayElement(userIds.length ? userIds : [null]),
        });
    }

    return pets;
};
