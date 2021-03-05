import { Injectable, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
var BreadcrumbService = /** @class */ (function () {
    function BreadcrumbService(router) {
        var _this = this;
        this.router = router;
        this.breadcrumbChanged = new EventEmitter(false);
        this.breadcrumbs = new Array();
        this.router.events.subscribe(function (routeEvent) { _this.onRouteEvent(routeEvent); });
    }
    BreadcrumbService.prototype.changeBreadcrumb = function (route, name) {
        var rootUrl = this.createRootUrl(route);
        var breadcrumb = this.breadcrumbs.find(function (bc) { return bc.url === rootUrl; });
        if (!breadcrumb) {
            return;
        }
        breadcrumb.displayName = name;
        this.breadcrumbChanged.emit(this.breadcrumbs);
    };
    BreadcrumbService.prototype.onRouteEvent = function (routeEvent) {
        if (!(routeEvent instanceof NavigationEnd)) {
            return;
        }
        var route = this.router.routerState.root.snapshot;
        var url = '';
        var breadCrumbIndex = 0;
        var newCrumbs = [];
        while (route.firstChild != null) {
            route = route.firstChild;
            if (route.routeConfig === null) {
                continue;
            }
            if (!route.routeConfig.path) {
                continue;
            }
            url += "/" + this.createUrl(route);
            if (!route.data['breadcrumb']) {
                continue;
            }
            var newCrumb = this.createBreadcrumb(route, url);
            if (breadCrumbIndex < this.breadcrumbs.length) {
                var existing = this.breadcrumbs[breadCrumbIndex++];
                if (existing && existing.route == route.routeConfig) {
                    newCrumb.displayName = existing.displayName;
                }
            }
            newCrumbs.push(newCrumb);
        }
        this.breadcrumbs = newCrumbs;
        this.breadcrumbChanged.emit(this.breadcrumbs);
    };
    BreadcrumbService.prototype.createBreadcrumb = function (route, url) {
        return {
            displayName: route.data['breadcrumb'],
            terminal: this.isTerminal(route),
            url: url,
            route: route.routeConfig
        };
    };
    BreadcrumbService.prototype.isTerminal = function (route) {
        return route.firstChild === null
            || route.firstChild.routeConfig === null
            || !route.firstChild.routeConfig.path;
    };
    BreadcrumbService.prototype.createUrl = function (route) {
        return route.url.map(function (s) { return s.toString(); }).join('/');
    };
    BreadcrumbService.prototype.createRootUrl = function (route) {
        var url = '';
        var next = route.root;
        while (next.firstChild !== null) {
            next = next.firstChild;
            if (next.routeConfig === null) {
                continue;
            }
            if (!next.routeConfig.path) {
                continue;
            }
            url += "/" + this.createUrl(next);
            if (next === route) {
                break;
            }
        }
        return url;
    };
    BreadcrumbService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BreadcrumbService.ctorParameters = function () { return [
        { type: Router, },
    ]; };
    return BreadcrumbService;
}());
export { BreadcrumbService };
//# sourceMappingURL=breadcrumb.service.js.map