'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";

// Types for form fields
type CategoryType = 'aircon' | 'electrician' | 'handyman' | 'plumber' | 'ventilation';
type ServiceType = 'Install' | 'Repair';
type EquipmentType = 'basin' | 'bidet' | 'circuit_breaker' | 'filter' | 'general'
  | 'inline' | 'leak' | 'light' | 'servicing' | 'shower_bath' | 'socket'
  | 'switch' | 'toilet_bowl' | 'wall_mounted' | 'water_heater'
  | 'water_leak' | 'window_mounted';

const equipmentOptions: { [key: string]: string[] } = {
  electrician: ["Light", "Switch", "Socket", "Circuit_Breaker"],
  ventilation: ["Inline", "Wall_Mounted", "Window_Mounted"],
  plumbing: ["Water_Leak", "Water_Heater", "Toilet_Bowl", "Shower_Bath", "Basin", "Bidet"],
  handyman: ["General"],
  aircon: ["Leak", "Servicing", "Filter"],
};

interface PredictorFormProps {
  onPricePredict: (price: string) => void;
  onDurationPredict: (duration: string) => void;
}

const PredictorForm: React.FC<PredictorFormProps> = ({ onPricePredict, onDurationPredict }) => {
  const [priceError, setPriceError] = useState<string | null>(null);
  const [durationError, setDurationError] = useState<string | null>(null);
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [service, setService] = useState<ServiceType | null>(null);
  const [equipment, setEquipment] = useState<EquipmentType | null>(null);
  const [quantityCount, setQuantityCount] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleCategoryChange = (selectedCategory: CategoryType) => {
    setCategory(selectedCategory);
    setEquipment(null);
  };

  const handleEquipmentChange = (selectedEquipment: EquipmentType) => {
    setEquipment(selectedEquipment);
  };

  const handleServiceChange = (selectedService: ServiceType) => {
    setService(selectedService);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setQuantityCount(value);
  };

  const handlePriceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!category || !service || !equipment) {
      setValidationError("Please Ensure That Category, Service, And Equipment Are Selected Before Submitting.");
      return;
    }

    setLoading(true);

    const featureMap = {
      items: quantityCount,
      category_aircon: false,
      category_electrician: false,
      category_handyman: false,
      category_plumber: false,
      category_ventilation: false,
      equipment_Basin: false,
      equipment_Bidet: false,
      equipment_Circuit_Breaker: false,
      equipment_Filter: false,
      equipment_General: false,
      equipment_Inline: false,
      equipment_Leak: false,
      equipment_Light: false,
      equipment_Servicing: false,
      equipment_Shower_Bath: false,
      equipment_Socket: false,
      equipment_Switch: false,
      equipment_Toilet_Bowl: false,
      equipment_Wall_Mounted: false,
      equipment_Water_Heater: false,
      equipment_Water_Leak: false,
      equipment_Window_Mounted: false,
      service_Install: false,
      service_Repair: false,
    } as Record<string, boolean | number>;

    // Set selected category, equipment, and service to true
    if (category) featureMap[`category_${category}`] = true;
    if (equipment) featureMap[`equipment_${equipment}`] = true;
    if (service) featureMap[`service_${service}`] = true;

    // Map each featureMap property to a specific position in the featureArray
    const priceFeatureArray = new Array(25).fill(false);
    priceFeatureArray[0] = featureMap.items;
    priceFeatureArray[1] = featureMap.category_aircon;
    priceFeatureArray[2] = featureMap.category_electrician;
    priceFeatureArray[3] = featureMap.category_handyman;
    priceFeatureArray[4] = featureMap.category_plumber;
    priceFeatureArray[5] = featureMap.category_ventilation;
    priceFeatureArray[6] = featureMap.equipment_Basin;
    priceFeatureArray[7] = featureMap.equipment_Bidet;
    priceFeatureArray[8] = featureMap.equipment_Circuit_Breaker;
    priceFeatureArray[9] = featureMap.equipment_Filter;
    priceFeatureArray[10] = featureMap.equipment_General;
    priceFeatureArray[11] = featureMap.equipment_Inline;
    priceFeatureArray[12] = featureMap.equipment_Leak;
    priceFeatureArray[13] = featureMap.equipment_Light;
    priceFeatureArray[14] = featureMap.equipment_Servicing;
    priceFeatureArray[15] = featureMap.equipment_Shower_Bath;
    priceFeatureArray[16] = featureMap.equipment_Socket;
    priceFeatureArray[17] = featureMap.equipment_Switch;
    priceFeatureArray[18] = featureMap.equipment_Toilet_Bowl;
    priceFeatureArray[19] = featureMap.equipment_Wall_Mounted;
    priceFeatureArray[20] = featureMap.equipment_Water_Heater;
    priceFeatureArray[21] = featureMap.equipment_Water_Leak;
    priceFeatureArray[22] = featureMap.equipment_Window_Mounted;
    priceFeatureArray[23] = featureMap.service_Install;
    priceFeatureArray[24] = featureMap.service_Repair;

    // Map each featureMap property to a specific position in the featureArray
    const durationFeatureArray = new Array(26).fill(false);
    durationFeatureArray[0] = featureMap.items;
    durationFeatureArray[1] = 1;
    durationFeatureArray[2] = featureMap.category_aircon;
    durationFeatureArray[3] = featureMap.category_electrician;
    durationFeatureArray[4] = featureMap.category_handyman;
    durationFeatureArray[5] = featureMap.category_plumber;
    durationFeatureArray[6] = featureMap.category_ventilation;
    durationFeatureArray[7] = featureMap.equipment_Basin;
    durationFeatureArray[8] = featureMap.equipment_Bidet;
    durationFeatureArray[9] = featureMap.equipment_Circuit_Breaker;
    durationFeatureArray[10] = featureMap.equipment_Filter;
    durationFeatureArray[11] = featureMap.equipment_General;
    durationFeatureArray[12] = featureMap.equipment_Inline;
    durationFeatureArray[13] = featureMap.equipment_Leak;
    durationFeatureArray[14] = featureMap.equipment_Light;
    durationFeatureArray[15] = featureMap.equipment_Servicing;
    durationFeatureArray[16] = featureMap.equipment_Shower_Bath;
    durationFeatureArray[17] = featureMap.equipment_Socket;
    durationFeatureArray[18] = featureMap.equipment_Switch;
    durationFeatureArray[19] = featureMap.equipment_Toilet_Bowl;
    durationFeatureArray[20] = featureMap.equipment_Wall_Mounted;
    durationFeatureArray[21] = featureMap.equipment_Water_Heater;
    durationFeatureArray[22] = featureMap.equipment_Water_Leak;
    durationFeatureArray[23] = featureMap.equipment_Window_Mounted;
    durationFeatureArray[24] = featureMap.service_Install;
    durationFeatureArray[25] = featureMap.service_Repair;

    try {
      // Service Price Prediction
      const priceResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/predict/service-price`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features: priceFeatureArray }),
      });

      if (!priceResponse.ok) {
        throw new Error('Failed to fetch Service Price prediction. Please try again later.');
      }

      const priceData = await priceResponse.json();
      setPriceError(null);
      onPricePredict(priceData.prediction.toFixed(2));

      // Job Duration Prediction
      const durationResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/predict/job-duration`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features: durationFeatureArray }),
      });

      if (!durationResponse.ok) {
        throw new Error('Failed to fetch Job Duration prediction. Please try again later.');
      }

      const durationData = await durationResponse.json();
      setDurationError(null);
      onDurationPredict(Math.round(durationData.prediction).toString());
    } catch (error) {
      if (error instanceof Error) {
        setPriceError(error.message);
        setDurationError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePriceSubmit} className="space-y-4">
      <div className="mb-4">
        <label className="block">Job Category:</label>
        <select
          onChange={(e) => handleCategoryChange(e.target.value as CategoryType)}
          value={category || ""}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="" disabled>Select A Category</option>
          {Object.keys(equipmentOptions).map((key) => (
            <option key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {category && (
        <div className="mb-4">
          <label className="block">Equipment Type:</label>
          <select
            onChange={(e) => handleEquipmentChange(e.target.value as EquipmentType)}
            value={equipment || ""}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="" disabled>Select An Equipment</option>
            {equipmentOptions[category].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-4">
        <label className="block">Service Type:</label>
        <select
          onChange={(e) => handleServiceChange(e.target.value as ServiceType)}
          value={service || ""}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="" disabled>Select A Service</option>
          <option value="Install">Install</option>
          <option value="Repair">Repair</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block">Number of Quantity:</label>
        <select
          onChange={handleQuantityChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="" disabled>Select Quantity</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <Button
        type="submit"
        className="w-full bg-primary text-black p-3 rounded-lg"
        disabled={loading}
      >
        {loading ? 'Prediction In Progress ...' : 'Predict Now'}
      </Button>

      {validationError && <p className="text-red-500 text-center">{validationError}</p>}
      {priceError && <p className="text-red-500 text-center mt-4">{priceError}</p>}
      {durationError && <p className="mt-4 text-red-500">{durationError}</p>}
    </form>
  );
};

export default PredictorForm;
