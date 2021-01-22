import user from '../../service/user';

export default {
  getAllTrainees: async (parent, args, context) => {
    const { dataSources: { traineeAPI } } = context;
    const response = await traineeAPI.getTrainees();
    return response.data.records;
  },
  getTrainee: (parent, args) => {
    const { id } = args;
    return user.getUser(id);
  }
};
