import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mentor, MentorForm } from '../../mentor.model';

@Component({
  selector: 'app-mentor-form-presentation',
  templateUrl: './mentor-form-presentation.component.html',
  styleUrls: ['./mentor-form-presentation.component.css']
})
export class MentorFormPresentationComponent implements OnInit {

  @Input() public set mentorDetails(value: Mentor | null) {
    if (value) {
      this.isEditMode = true;
      this.mentorForm.patchValue(value);
      this._mentorDetails = value
    }
  }

  public get mentorDetails(): Mentor | null {
    return this._mentorDetails;
  }
  
  @Output() public addMentor: EventEmitter<MentorForm>;
  @Output() public editMentor: EventEmitter<MentorForm>;

  public mentorForm: FormGroup;
  public isSubmitted: boolean;
  public isEditMode: boolean;
  
  private _mentorDetails!: Mentor;

  constructor(private fb: FormBuilder) {
    this.addMentor = new EventEmitter();
    this.editMentor = new EventEmitter();
    this.mentorForm = this.createForm();
    this.isSubmitted = false;
    this.isEditMode = false;
  }

  ngOnInit(): void {
  }

  createForm() {
    return this.fb.group({
      name: [null, [Validators.required]],
      age: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      email: [null, [Validators.required]],
    })
  }

  onSubmit() {
    if (this.mentorForm.invalid) {
      return;
    }
    if (this.isEditMode) {
      this.editMentor.emit(this.mentorForm.value);
    } else {
      this.addMentor.emit(this.mentorForm.value);
    }
  }
}
