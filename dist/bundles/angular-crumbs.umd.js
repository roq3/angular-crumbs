(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/router')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', '@angular/router'], factory) :
	(factory((global.ng = global.ng || {}, global.ng['angular-crumbs'] = global.ng['angular-crumbs'] || {}),global.ng.core,global.ng.common,global.ng.router));
}(this, (function (exports,_angular_core,_angular_common,_angular_router) { 'use strict';

var Breadcrumb = /** @class */ (function () {
    function Breadcrumb() {
    }
    return Breadcrumb;
}());

var BreadcrumbService = /** @class */ (function () {
    function BreadcrumbService(router) {
        var _this = this;
        this.router = router;
        this.breadcrumbChanged = new _angular_core.EventEmitter(false);
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
        if (!(routeEvent instanceof _angular_router.NavigationEnd)) {
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
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    BreadcrumbService.ctorParameters = function () { return [
        { type: _angular_router.Router, },
    ]; };
    return BreadcrumbService;
}());

var BreadcrumbComponent = /** @class */ (function () {
    function BreadcrumbComponent(breadcrumbService) {
        var _this = this;
        this.breadcrumbService = breadcrumbService;
        breadcrumbService.breadcrumbChanged.subscribe(function (crumbs) { _this.onBreadcrumbChange(crumbs); });
    }
    BreadcrumbComponent.prototype.onBreadcrumbChange = function (crumbs) {
        this.breadcrumbs = crumbs;
    };
    BreadcrumbComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'breadcrumb',
                    template: "<div #template>\n    <ng-content></ng-content>\n</div>\n<div class=\"container\" *ngIf=\"template.children.length == 0\">\n    <div class=\"nav-wrapper\">\n        <div class=\"breadcrumb\" *ngFor=\"let route of breadcrumbs\" [ngClass]=\"{'last': route.terminal}\">\n            <!-- disable link of last item -->\n            <a href=\"\" *ngIf=\"!route.terminal\" [routerLink]=\"[route.url]\">{{ route.displayName }}</a>\n            <span *ngIf=\"route.terminal\">{{ route.displayName }}</span>\n        </div>\n    </div>\n</div>"
                },] },
    ];
    /** @nocollapse */
    BreadcrumbComponent.ctorParameters = function () { return [
        { type: BreadcrumbService, },
    ]; };
    return BreadcrumbComponent;
}());

function breadcrumbServiceFactory(router) {
    return new BreadcrumbService(router);
}
var BreadcrumbModule = /** @class */ (function () {
    function BreadcrumbModule() {
    }
    BreadcrumbModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [_angular_common.CommonModule, _angular_router.RouterModule],
                    providers: [
                        { provide: BreadcrumbService, useFactory: breadcrumbServiceFactory, deps: [_angular_router.Router] }
                    ],
                    declarations: [BreadcrumbComponent],
                    exports: [BreadcrumbComponent]
                },] },
    ];
    /** @nocollapse */
    BreadcrumbModule.ctorParameters = function () { return []; };
    return BreadcrumbModule;
}());

exports.Breadcrumb = Breadcrumb;
exports.BreadcrumbModule = BreadcrumbModule;
exports.BreadcrumbService = BreadcrumbService;
exports.BreadcrumbComponent = BreadcrumbComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
