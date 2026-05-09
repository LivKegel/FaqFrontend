import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';

@Component({
    selector: 'app-create-user',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './create-user.component.html',
    styleUrl: './create-user.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUserComponent implements OnInit {
    formGroup :FormGroup = new FormGroup({
        username: new FormControl('ds', Validators.required),
        email: new FormControl('sd', Validators.required),
        password: new FormControl('sdds', [Validators.required, Validators.minLength(8)]),
    });

    constructor(private userService: UserService) {
        
    }

    ngOnInit(): void {
        console.log('Hello World');
    }

    // this funktion is for creating a new user
    createUser(): void {
        if (this.formGroup.valid) {
            const userData: {username :string, email:string, password:string} = this.formGroup.getRawValue();
            this.userService.createUser(userData).subscribe(() => {
                console.log('User created');
            });

        }
        

    }

}
