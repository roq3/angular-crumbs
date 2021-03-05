# Angular Breadcrumb

## Pre installation

Create a configuration file ".npmrc" in the root of the project to use this package with the content: 
```
registry=https://npm.pkg.github.com/roq3
```

## Installation

```shell
npm install @roq3/angular-crumbs@3.0.2 --save
```

#### 1. Import the `BreadcrumbModule`
Import `BreadcrumbModule` in the NgModule of your application.

```typescript
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from '@angular/core';
import {BreadcrumbModule} from '@roq3/angular-crumbs';

@NgModule({
    imports: [
        BrowserModule,
        BreadcrumbModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
```

#### 2. Set breadcumbs in `app.routes`
```javascript
export const rootRouterConfig: Routes = [  
    {path: '', redirectTo: 'home', pathMatch: 'full'},  
    {path: 'home', ..., data: { breadcrumb: 'Home'}},  
    {path: 'about', ..., data: { breadcrumb: 'About'}},  
    {path: 'github', ..., data: { breadcrumb: 'GitHub'},  
        children: [  
            {path: '', ...},  
            {path: ':org', ..., data: { breadcrumb: 'Repo List'},  
                children: [  
                    {path: '', ...},  
                    {path: ':repo', ..., data: { breadcrumb: 'Repo'}}  
                ]  
        }]  
    }  
];
```

#### 3. Update the markup
- Import the `style.css` into your web page
- Add `<breadcrumb></breadcrumb>` tag in template of your application component.

## Demo [(live)](https://emilol.github.io/angular-crumbs)

## Customization

### Template Customization

You can BYO template using the breadcrumb's ng-content transclude. 

#### bootstrap breadcrumb:

```html 
<breadcrumb #parent>  
  <ol class="breadcrumb">
    <ng-template ngFor let-route [ngForOf]="parent.breadcrumbs">
      <li *ngIf="!route.terminal" class="breadcrumb-item">
        <a href="" [routerLink]="[route.url]">{{ route.displayName }}</a>
      </li>
      <li *ngIf="route.terminal" class="breadcrumb-item active" aria-current="page">{{ route.displayName }}</li>
    </ng-template>
  </ol>
</breadcrumb>  
```

#### @angular/material breadcrumb

```html
<breadcrumb #parent>
    <span class="breadcrumb" *ngFor="let route of parent.breadcrumbs">
        <a mat-button *ngIf="!route.terminal" href="" [routerLink]="[route.url]">{{ route.displayName }}</a>
        <a mat-button *ngIf="route.terminal">{{ route.displayName }}</a>
    </span>
</breadcrumb>
```

#### primeng breadcrumb

```html
<p-breadcrumb [model]="breadcrumbs"></p-breadcrumb>
```
```typescript
export class AppComponent {
    breadcrumbs: MenuItem[];

    constructor(private breadcrumbService: BreadcrumbService) { }

    ngOnInit() {
        this.breadcrumbService.breadcrumbChanged.subscribe(crumbs => {
            this.breadcrumbs = crumbs.map(c => this.toPrimeNgMenuItem(c));
        });
    }

    private toPrimeNgMenuItem(crumb: Breadcrumb) {
        return <MenuItem>{ label: crumb.displayName, url: `#${crumb.url}`}
    }
}
```

### Dynamic breadcrumbs 

Use `BreadcrumbService` to set the breadcrumb description dynamically. [See full demo example](https://github.com/emilol/angular-crumbs/blob/master/demos/demo-angular-six/src/app/shared/github/repo-detail/repo-detail.component.ts)

```typescript
ngOnInit() {
  ...      
  this.github
    .getRepoForOrg(this.org, this.repo)
    .subscribe(repoDetails => {
        ...
        this.breadcrumbService.changeBreadcrumb(this.route.snapshot, repoDetails.name);

  });
  ...
}
```

### Dynamic page titles

Use `BreadcrumbService` to subscribe to breadcrumb changes. [See full demo example](https://github.com/emilol/angular-crumbs/blob/master/demos/demo-angular-six/projects/bootstrap-demo/src/app/app.component.ts)

```typescript
ngOnInit() {
  this.breadcrumbService.breadcrumbChanged.subscribe((crumbs) => {
    this.titleService.setTitle(this.createTitle(crumbs));
  });
}
```

# License
 [MIT](/LICENSE)