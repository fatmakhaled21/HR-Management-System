export interface Leaves {
   id: number
  employee_id: number
  leave_type: string
  start_date: string
  end_date: string
  status: string
   employees?: {
    name: string;
  };
}
