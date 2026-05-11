// Shared server-side data shapes. Mirrors the DB row shapes from the
// public.* tables. Frontend consumers will see these as JSON over the API.

export type Location = {
  location_id: number;
  name: string | null;
  street_address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  phone: string | null;
  email: string | null;
};
