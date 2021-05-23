import { models } from "./db.mjs";

// const toRelayIds = (data) =>
//     Array.isArray(data)
//         ? data.map((item, i) => toRelayIds(item))
//         : ((item) => {
//               console.log(item);
//               return item;
//           })(data);

const toRelayIds = (data) => {
    console.log(data);
    return data;
};

const rootValue = {
    entities: async () => await models.Entity.findAll(),
    createEntity: async ({ input }) => await models.Entity.create({ name: input.name }),
};

export default rootValue;
