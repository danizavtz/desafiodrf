import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {
    constructor(public router: Router) { }

    canActivate(): boolean {
        return this.getUserAuthenticationToken();
    }

    private getUserAuthenticationToken(): boolean {
        const tkn = JSON.parse(localStorage.getItem('currentUser'));
        if (tkn && tkn.hasOwnProperty('token')) {
            return true;
        }
        this.router.navigateByUrl('login');
        return false;
    }
}