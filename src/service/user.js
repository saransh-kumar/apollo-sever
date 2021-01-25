/* eslint-disable no-console */
class User {
  constructor() {
    this.users = new Map();
    this.id = 0;
  }

  getAllUsers() {
    console.log('data:', this.users.values());
    return this.users.values();
  }

  createUser(user) {
    this.id += 1;
    this.users.set(this.id, { ...user, id: this.id });
    return this.users.get(this.id);
  }

  updateUser(user) {
    this.users.set(Number(user.id), {
      ...user
    });
    return this.users.get(Number(user.id));
  }

  deleteUser(id) {
    this.users.delete(Number(id));
    return id;
  }

  getUser(id) {
    return this.users.get(Number(id));
  }
}
export default new User();
