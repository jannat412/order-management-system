// Every Angular application has at least one component:
// the root component, named AppComponent here.
//
// Components are the basic building blocks of Angular applications.
// A component controls a portion of the screen—a view—through its associated template.
import { Component }         from '@angular/core';

@Component({
    selector: 'my-app',
    template: '<h1>{{ title }}</h1>'
})
export class AppComponent {
    title: string = 'My first Angular 2 App';
}
