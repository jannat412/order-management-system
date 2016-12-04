/* tslint:disable:no-unused-variable */
import {NO_ERRORS_SCHEMA}          from '@angular/core';
import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';

describe( 'App: Order Management System', () => {
    beforeEach( () => {
        TestBed.configureTestingModule( {
            declarations: [
                AppComponent
            ],
            schemas: [NO_ERRORS_SCHEMA]
        } );
    } );

    it( 'should create the app', async( () => {
        let fixture = TestBed.createComponent( AppComponent );
        let app = fixture.debugElement.componentInstance;
        expect( app ).toBeTruthy();
    } ) );

    it( 'should render main app contents in a container with container-fluid class', async( () => {
        let fixture = TestBed.createComponent( AppComponent );
        let compiled = fixture.debugElement.nativeElement;
        expect( compiled.querySelector( '.container-fluid' ) ).toBeTruthy();
    } ) );
} );
