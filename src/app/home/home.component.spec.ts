/* tslint:disable:no-unused-variable */
import {NO_ERRORS_SCHEMA}          from '@angular/core';
import {TestBed, async} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import {ConfigService} from '../services/config.service';

describe( 'App: Order Management System', () => {
    let configService: ConfigService = new ConfigService();
    beforeEachProviders(() => [ConfigService]);
    beforeEach( () => {

        TestBed.configureTestingModule( {
            declarations: [
                HomeComponent
            ],
            schemas: [NO_ERRORS_SCHEMA]
        } );
    } );

    it( 'should create the home component', async( () => {
        let fixture = TestBed.createComponent( HomeComponent );
        let app = fixture.debugElement.componentInstance;
        expect( app ).toBeTruthy();
    } ) );

    it( 'should get the active app state from the config service', () => {
        let fixture = TestBed.createComponent( HomeComponent );
        let app = fixture.debugElement.componentInstance;

        fixture.detectChanges();
        expect(configService.getActive()).toEqual(app.isActive);
    } );

    it( 'should display the activeSlogan class <p> tag if the app is active', () => {
        let fixture = TestBed.createComponent( HomeComponent );
        let app = fixture.debugElement.componentInstance;
        app.isActive = true;
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector( '.activeSlogan' )).toBeTruthy();
    } );
} );
