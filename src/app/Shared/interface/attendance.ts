export interface Attendance {
  id: number
  employee_id: number
  check_in?: string
  check_out?: string
  status: string
   employees?: {
    name: string;
  };
}
