import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';
import { BreadcrumbComponent } from './breadcrumb.component';
export function breadcrumbServiceFactory(router) {
    return new BreadcrumbService(router);
}
var BreadcrumbModule = /** @class */ (function () {
    function BreadcrumbModule() {
    }
    BreadcrumbModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, RouterModule],
                    providers: [
                        { provide: BreadcrumbService, useFactory: breadcrumbServiceFactory, deps: [Router] }
                    ],
                    declarations: [BreadcrumbComponent],
                    exports: [BreadcrumbComponent]
                },] },
    ];
    /** @nocollapse */
    BreadcrumbModule.ctorParameters = function () { return []; };
    return BreadcrumbModule;
}());
export { BreadcrumbModule };
//# sourceMappingURL=breadcrumb.module.js.map