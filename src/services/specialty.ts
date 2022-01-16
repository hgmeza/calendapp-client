import axios from "axios";

const API = process.env.REACT_APP_API;

type GetAllSpecialties = {
  result?: { specialty: string }[];
  error?: { message: string };
};

export type Provider = {
  specialty: string;
  provider: string;
  address: {
    city: string;
    street: string;
    suite: string;
    zipcode: string;
  };
};

type GetBySpecialties = {
  result?: Provider[];
  error?: { message: string };
};

type GetProvider = {
  result?: {
    provider: string;
    specialty: string;
    availability: string[];
  };
  error?: { message: string };
};

export const getAllSpecialties = async () => {
  const url = `${API}/specialty-data`;
  const { data } = (await axios.get(url)) as { data: GetAllSpecialties };

  if (data.result) {
    return data.result.map(res => ({ label: res.specialty }));
  }
  const msg = "There was a problem with our servers. Please try again later";
  throw new Error(msg);
};

export const getBySpecialties = async (specialty: string) => {
  const url = `${API}/by-specialty?specialty=${specialty}`;
  const { data } = (await axios.get(url)) as { data: GetBySpecialties };

  if (data.result) {
    return data.result;
  }
  const msg = "There was a problem with our servers. Please try again later";
  throw new Error(msg);
};

export const getProvider = async (specialty: string, provider: string) => {
  const url = `${API}/availability?specialty=${specialty}&provider=${provider}`;
  const { data } = (await axios.get(url)) as { data: GetProvider };

  if (data.result) {
    return data.result;
  }
  const msg = "There was a problem with our servers. Please try again later";
  throw new Error(msg);
};
