const deleteUser = jest.fn();

const auth = jest.fn(() => ({
  deleteUser,
}));

module.exports = {
  auth,
  deleteUser, // optional: direct access if needed
};