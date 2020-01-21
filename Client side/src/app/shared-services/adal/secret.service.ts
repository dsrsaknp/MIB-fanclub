import { Injectable } from '@angular/core';
@Injectable()
export class SecretService {
    public get adalConfig(): any {
        return {
            tenant: '85c997b9-f494-46b3-a11d-772983cf6f11',
            clientId: 'f053b122-955e-4b6c-82ec-e8530d3ed4c8',
            redirectUri: window.location.origin + '/',
            postLogoutRedirectUri: window.location.origin + '/'
        };
    }
}