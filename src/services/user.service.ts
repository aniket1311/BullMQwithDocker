import axios from 'axios';
import dotenv from 'dotenv';
import { User } from '../models/user.model.js';
import { PaginationResponse } from '../Utils/pagination-response.js';

dotenv.config();

export const fetchUser = async (params: any): Promise<PaginationResponse> => {
  const query: Record<string, any> = {};
  const limit = parseInt(String(params.limit)) || 10;
  const page = parseInt(String(params.page)) || 1;
  const skip = (page - 1) * limit;
  const search = params?.search;
  if (search) {
    const searchQuery: Record<string, any> = JSON.parse(search);
    for (const key in searchQuery) {
      query[key] = searchQuery[key];
    }
  }

  const sortBy = params?.sortBy;
  const sort: Record<string, any> = {};
  sort[sortBy] = 1;
  const total = await User.count(query);
  const totalPages = Math.ceil(total / limit);
  const items = await User.find(query).limit(limit).skip(skip).sort(sort);
  return {
    total,
    limit,
    page,
    sortBy,
    totalPages,
    items,
  };
};

export const createUser = async () => {
  const requestBatchWise = process.env.RequestPerBatch || 5;
  const baseUrl =
    process.env.BASE_URL || 'https://randomuser.me/api/?results=10';
  try {
    const requestsBatch = Array.from({ length: +requestBatchWise }, () =>
      axios.get(baseUrl)
    );
    const responses = await Promise.all(requestsBatch);

    responses.forEach(async (response) => {
      const users = response.data.results;
      let userDocs = users.map((user: any) => ({
        gender: user.gender,
        name: `${user.name.first} ${user.name.last}`,
        dob: user.dob.date,
        age: user.dob.age,
        email: user.email,
        picture: user.picture.large,
        address: {
          city: user.location.city,
          state: user.location.state,
          country: user.location.country,
          street: `${user.location.street.number} ${user.location.street.name}`,
        },
      }));
      await User.insertMany(userDocs);
    });
  } catch (error) {
    console.error('Error fetching users:', error);
  }

  return { message: 'All Users fetched successfully' };
};
