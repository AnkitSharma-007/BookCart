import {
  HttpRequest,
  HttpInterceptorFn,
  HttpHandlerFn,
} from "@angular/common/http";

export function HttpInterceptorService(
  request: HttpRequest<unknown>,
  newRequest: HttpHandlerFn
) {
  const headerToken = localStorage.getItem("authToken");

  if (headerToken) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${headerToken}`,
      },
    });
  }
  return newRequest(request);
}
