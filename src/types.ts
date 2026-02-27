export type FormState = {
  name: string;
  rollNo: string;
  registrationNo: string;
  department: string;
  phone: string;
  idCard: File | null;
};

export type Registration = {
  id: string;
  user_id: string;
  name: string;
  roll_no: string;
  registration_no: string;
  department: string;
  phone: string;
  id_card_url: string;
  attended: boolean;
  created_at: string;
};
