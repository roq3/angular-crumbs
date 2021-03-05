import { Breadcrumb } from './breadcrumb';
import { BreadcrumbService } from './breadcrumb.service';
export declare class BreadcrumbComponent {
    private breadcrumbService;
    breadcrumbs: Breadcrumb[];
    constructor(breadcrumbService: BreadcrumbService);
    private onBreadcrumbChange;
}
