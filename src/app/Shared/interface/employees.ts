export interface Employees {
  id: number
  name: string
  email: string
  phone: string
  department_id: number
  salary: number
  hire_date: string
  status: string
   departments?: {
    name: string;
  };
}
