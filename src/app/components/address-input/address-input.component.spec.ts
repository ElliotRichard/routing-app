import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressInputComponent } from './address-input.component';
import { RouteStringPipe } from '../../pipes/route-string.pipe';
import { ROUTE } from 'src/shared/types';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

describe('AddressInputComponent', () => {
	let component: AddressInputComponent;
	let fixture: ComponentFixture<AddressInputComponent>;
    
    beforeEach(async () => {
	await TestBed.configureTestingModule({
	    declarations: [
			AddressInputComponent,
			RouteStringPipe,
	    ],
	    imports: [
			HttpClientTestingModule,
			MatFormFieldModule,
			MatInputModule,
			NoopAnimationsModule,
	    ],
	    providers: [
		{
	        provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
		    useValue: { floatLabel: 'always' },
		},
	    ]
	}).compileComponents();
	fixture = TestBed.createComponent(AddressInputComponent);
	component = fixture.componentInstance;
	component.type = ROUTE.START;
	fixture.detectChanges();
    });
    
    it('should create', () => {
		expect(component).toBeTruthy();
    });
    
    it('should be the the first input of the page', () => {
		expect(component.type).toBe(ROUTE.START);
    });
});