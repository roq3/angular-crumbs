import { EventEmitter } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Breadcrumb } from './breadcrumb';
export declare class BreadcrumbService {
    private router;
    breadcrumbChanged: EventEmitter<Breadcrumb[]>;
    private breadcrumbs;
    constructor(router: Router);
    changeBreadcrumb(route: ActivatedRouteSnapshot, name: string): void;
    private onRouteEvent;
    private createBreadcrumb;
    private isTerminal;
    private createUrl;
    private createRootUrl;
}
