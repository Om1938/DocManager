import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs'
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem('token');
        //console.log(request.headers);
        if (token) {
            request = request.clone({
                headers: request.headers.append('Authorization', `${token}`)
            });
        }
        //console.log(request.headers);
        return next.handle(request);
    }
}