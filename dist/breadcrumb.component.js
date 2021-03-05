import { Component } from '@angular/core';
import { BreadcrumbService } from './breadcrumb.service';
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
        { type: Component, args: [{
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
export { BreadcrumbComponent };
//# sourceMappingURL=breadcrumb.component.js.map