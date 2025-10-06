module.exports = {
  from: jest.fn(() => ({
    insert: jest.fn(),
    select: jest.fn(),
    select: jest.fn(() => ({
      eq: jest.fn(() => ({
        single: jest.fn(),
      })),
    })),
    eq: jest.fn(),
    upsert: jest.fn(),
    select: jest.fn(() => ({
      eq: jest.fn(() => ({
        single: jest.fn(),
      })),
    })),
    delete: jest.fn(() => ({
      eq: jest.fn(),
    })),

  })),
};