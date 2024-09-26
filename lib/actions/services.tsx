'use server';

import Service from '@/models/Service';

const getService = async (serviceId: string) => {
  return Service.findById(serviceId);
};

const getServices = async () => {
  return Service.find();
};

export { getService, getServices };
