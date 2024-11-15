"use server";

import Vehicle from "@/models/Vehicle";
import { z } from "zod";
import mongoose from "mongoose";

const fieldFriendlyNames: Record<string, string> = {
  licencePlate: "Licence Plate",
  gpsApi: "GPS API",
  make: "Make",
  model: "Model",
  status: "Status",
};

const addVehicle = async (vehicle: {
  licencePlate: string;
  gpsApi: string;
  make: string;
  model: string;
  status: string;
}): Promise<{ message: string; errors?: string | Record<string, unknown> }> => {
  const vehicleSchema = z.object({
    licencePlate: z.string().min(1),
    gpsApi: z.string().min(1),
    make: z.string().min(1),
    model: z.string().min(1),
    status: z.enum(["Draft", "Active", "Disabled"]),
  });

  const response = vehicleSchema.safeParse({
    licencePlate: vehicle.licencePlate,
    gpsApi: vehicle.gpsApi,
    make: vehicle.make,
    model: vehicle.model,
    status: vehicle.status,
  });

  if (!response.success) {
    return { message: "", errors: response.error.flatten().fieldErrors };
  }

  try {
    const newVehicle = new Vehicle(response.data);
    await newVehicle.save();

    return { message: "Vehicle added successfully" };
  } catch (error: unknown) {
    if (error instanceof mongoose.Error.ValidationError && error.errors) {
      // Mongoose validation errors (including unique-validator errors)
      const mongooseErrors = Object.keys(error.errors).reduce(
        (acc, key) => {
          const friendlyKey = fieldFriendlyNames[key] || key; // Map to friendly name if available
          const errorMessage = error.errors[key].message.replace(
            key,
            friendlyKey
          ); // Replace field name in the message
          acc[friendlyKey] = [errorMessage]; // Structure as an array to match Zod format
          return acc;
        },
        {} as Record<string, string[]>
      );

      return { message: "Validation error", errors: mongooseErrors };
    }

    return { message: "An unexpected error occurred" };
  }
};


const getVehicle = async (vehicleId: string) => {
  return Vehicle.findById(vehicleId);
};

const getVehicleByLicencePlate = async (licencePlate: string) => {
  return Vehicle.findOne({ licencePlate });
};

const getVehicles = async () => {
  return Vehicle.find();
};

export { addVehicle, getVehicle, getVehicles, getVehicleByLicencePlate };
