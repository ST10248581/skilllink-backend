const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

// Mocks
jest.mock('../client/SupabaseClient');
jest.mock('firebase-admin');
const supabase = require('../client/SupabaseClient');
const admin = require('firebase-admin');

// Controllers
const {
  syncFirebaseUser,
  deleteCustomerAccount,
} = require('../controllers/UserController');

// Setup Express test app
const app = express();
app.use(bodyParser.json());

// Middleware to inject mock user
app.use((req, res, next) => {
  req.user = {
    uid: 'abc123',
    email: 'test@example.com',
    name: 'Alwande Ngcobo',
  };
  next();
});

app.post('/users/sync', syncFirebaseUser);
app.delete('/users/me', deleteCustomerAccount);

describe('Customer endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should sync Firebase user to Supabase', async () => {
    const mockData = [{ id: 1 }];
    supabase.from.mockReturnValue({
      upsert: jest.fn().mockResolvedValue({ data: mockData, error: null }),
    });

    const res = await request(app).post('/users/sync');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'User synced', data: mockData });
  });

  it('should return 500 if upsert fails', async () => {
    supabase.from.mockReturnValue({
      upsert: jest.fn().mockResolvedValue({
        data: null,
        error: { message: 'Upsert failed' },
      }),
    });

    const res = await request(app).post('/users/sync');
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: 'Upsert failed' });
  });

  it('should delete customer account and related data', async () => {
    const selectMock = jest.fn(() => ({
      eq: jest.fn(() => ({
        single: jest.fn().mockResolvedValue({
          data: { id: 42 },
          error: null,
        }),
      })),
    }));

    const deleteMock = jest.fn(() => ({
      eq: jest.fn().mockResolvedValue({ data: null, error: null }),
    }));

    supabase.from
      .mockImplementationOnce(() => ({ select: selectMock })) // find customer
      .mockImplementationOnce(() => ({ delete: deleteMock })) // delete bookings
      .mockImplementationOnce(() => ({ delete: deleteMock })) // delete payments
      .mockImplementationOnce(() => ({ delete: deleteMock })); // delete customer

    admin.auth().mockReturnValue({
      deleteUser: jest.fn().mockResolvedValue(true),
    });

    const res = await request(app).delete('/users/me');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ ok: true, message: 'Account and all data deleted' });
  });

  it('should return 404 if customer not found', async () => {
    const selectMock = jest.fn(() => ({
      eq: jest.fn(() => ({
        single: jest.fn().mockResolvedValue({ data: null, error: null }),
      })),
    }));

    supabase.from.mockReturnValue({ select: selectMock });

    const res = await request(app).delete('/users/me');
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: 'Customer not found' });
  });

  it('should return 500 if deletion throws error', async () => {
    supabase.from.mockImplementation(() => {
      throw new Error('Unexpected failure');
    });

    const res = await request(app).delete('/users/me');
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: 'Failed to delete account and data' });
  });
});

/* Code Attribution
Code from Copilot
Link:
Accessed: 6 October 2025
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

// Mocks
jest.mock('../client/SupabaseClient');
jest.mock('firebase-admin');
const supabase = require('../client/SupabaseClient');
const admin = require('firebase-admin');

// Controllers
const {
  syncFirebaseUser,
  deleteCustomerAccount,
} = require('../controllers/CustomerController');

// Setup Express test app
const app = express();
app.use(bodyParser.json());

// Middleware to inject mock user
app.use((req, res, next) => {
  req.user = {
    uid: 'abc123',
    email: 'test@example.com',
    name: 'Alwande Ngcobo',
  };
  next();
});

app.post('/users/sync', syncFirebaseUser);
app.delete('/users/me', deleteCustomerAccount);

describe('Customer endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should sync Firebase user to Supabase', async () => {
    const mockData = [{ id: 1 }];
    supabase.from.mockReturnValue({
      upsert: jest.fn().mockResolvedValue({ data: mockData, error: null }),
    });

    const res = await request(app).post('/users/sync');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'User synced', data: mockData });
  });

  it('should return 500 if upsert fails', async () => {
    supabase.from.mockReturnValue({
      upsert: jest.fn().mockResolvedValue({
        data: null,
        error: { message: 'Upsert failed' },
      }),
    });

    const res = await request(app).post('/users/sync');
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: 'Upsert failed' });
  });

  it('should delete customer account and related data', async () => {
    const selectMock = jest.fn(() => ({
      eq: jest.fn(() => ({
        single: jest.fn().mockResolvedValue({
          data: { id: 42 },
          error: null,
        }),
      })),
    }));

    const deleteMock = jest.fn(() => ({
      eq: jest.fn().mockResolvedValue({ data: null, error: null }),
    }));

    supabase.from
      .mockImplementationOnce(() => ({ select: selectMock })) // find customer
      .mockImplementationOnce(() => ({ delete: deleteMock })) // delete bookings
      .mockImplementationOnce(() => ({ delete: deleteMock })) // delete payments
      .mockImplementationOnce(() => ({ delete: deleteMock })); // delete customer

    admin.auth().deleteUser.mockResolvedValue(true);

    const res = await request(app).delete('/users/me');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ ok: true, message: 'Account and all data deleted' });
  });

  it('should return 404 if customer not found', async () => {
    const selectMock = jest.fn(() => ({
      eq: jest.fn(() => ({
        single: jest.fn().mockResolvedValue({ data: null, error: null }),
      })),
    }));

    supabase.from.mockImplementationOnce(() => ({ select: selectMock }));

    const res = await request(app).delete('/users/me');
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: 'Customer not found' });
  });

  it('should return 500 if deletion throws error', async () => {
    supabase.from.mockImplementation(() => {
      throw new Error('Unexpected failure');
    });

    const res = await request(app).delete('/users/me');
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: 'Failed to delete account and data' });
  });
}); */