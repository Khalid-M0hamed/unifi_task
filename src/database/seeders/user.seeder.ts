import { UserModel } from '../../modules/user/models';

const usersData = [
  {
    username: 'user1',
    email: 'user1@example.com',
    password: 'password1',
    todos: [
      { task: 'Task 1', completed: false },
      { task: 'Task 2', completed: true },
    ],
    tokens:[]
  },
  {
    username: 'user2',
    email: 'user2@example.com',
    password: 'password2',
    todos: [
      { task: 'Task 3', completed: false },
      { task: 'Task 4', completed: true },
    ],
    tokens:[]
  },
];

export async function seedUsers() {
  try {
    // Clear existing users
    await UserModel.deleteMany({});
    const userInstances = usersData.map(user => new UserModel(user));
  
    for (const userInstance of userInstances) {
      await userInstance.save();
    }

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } 
}


