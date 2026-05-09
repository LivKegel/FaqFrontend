import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import { MaterialModule } from '../../../shared/material.module';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {


    formGroup :FormGroup = new FormGroup({
        username: new FormControl('test', Validators.required),
        password: new FormControl('12345678', Validators.required),
    });

    constructor(private userService: UserService) {
        
    }

    ngOnInit(): void {
        console.log('Hello World');
    }

    login(): void {
        if (this.formGroup.valid) {
            const userData: {username :string, password:string} = this.formGroup.getRawValue();
            this.userService.loginUser(userData).subscribe((response) => {
                console.log('Response:', response);
            });
        }
    }
}
