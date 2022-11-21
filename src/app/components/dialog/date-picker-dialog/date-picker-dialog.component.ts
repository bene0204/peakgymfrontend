import { Component, OnInit, ViewChild} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl} from "@angular/forms";
import {MatDatepicker} from "@angular/material/datepicker";

@Component({
  selector: "app-date-picker-dialog",
  templateUrl: "date-picker-dialog.component.html",
  styleUrls: ["date-picker-dialog.component.scss"]
})
export class DatePickerDialogComponent implements OnInit{

  datePicker!: FormControl;
  @ViewChild("startDate") picker?: MatDatepicker<Date>

  constructor(public dialogref: MatDialogRef<DatePickerDialogComponent>, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.datePicker = this.fb.control(new Date());
    this.picker?.open();
  }

  chooseStartDate() {
    this.dialogref.close(this.datePicker.value);
  }

  cancel(){
    this.dialogref.close();
  }
}
