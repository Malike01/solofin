export const generateRandomUser = () => {
  const randomId = Math.floor(Math.random() * 10000);
  return {
    name: `Test User ${randomId}`,
    email: `testuser${randomId}@example.com`,
    password: 'Password123!',
  };
};