import user from '../../service/user';

export default {
  getAllTrainees: async (parent, args, context) => {
    const { dataSources: { traineeAPI } } = context;
    const {
      payload: {
        skip, limit, sortedBy, sortedOrder
      }
    } = args;
    const response = await traineeAPI.getTrainees(skip, limit, sortedBy, sortedOrder);
    return response.data;
  },
  getTrainee: (parent, args) => {
    const { id } = args;
    return user.getUser(id);
  }
};
