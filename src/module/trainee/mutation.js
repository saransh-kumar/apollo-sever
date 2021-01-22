/* eslint-disable import/no-duplicates */
import pubsub from '../pubsub';
import constant from '../../lib/constant';

export default {
  createTrainee: async (parent, args, context) => {
    const { user } = args;
    const { dataSources: { traineeAPI } } = context;
    const addedUser = await traineeAPI.createTrainee({ ...user });
    pubsub.publish(constant.subscriptions.TRAINEE_ADDED, { traineeAdded: addedUser });
    return addedUser.data;
  },
  updateTrainee: async (parent, args, context) => {
    const { user } = args;
    const { dataSources: { traineeAPI } } = context;
    const updatedUser = await traineeAPI.updateTrainee({ ...user });
    pubsub.publish(constant.subscriptions.TRAINEE_UPDATED, { traineeUpdated: updatedUser });
    return updatedUser.data.data;
  },
  deleteTrainee: async (parent, args, context) => {
    const { originalId } = args;
    console.log(originalId);
    const { dataSources: { traineeAPI } } = context;
    const deletedId = await traineeAPI.deleteTrainee({ originalId });
    pubsub.publish(constant.subscriptions.TRAINEE_DELETED, { traineeDeleted: deletedId });
    console.log(deletedId);
    return deletedId.message;
  }
};
