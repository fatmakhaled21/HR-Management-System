import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
/*   const token = localStorage.getItem('token');
    const clonedReq = req.clone({
      setHeaders: {
         apikey: environment.supabaseKey,
      Authorization: `Bearer ${environment.supabaseKey}`
      }
    }); */


const token = localStorage.getItem('eToken');

let headers: any = {
  apikey: environment.supabaseKey,
  Authorization: `Bearer ${environment.supabaseKey}`,
};

if (token) {
  headers.token = token;
}

req = req.clone({
  setHeaders: headers,
});

return next(req);
/*   return next(clonedReq);
 */};
