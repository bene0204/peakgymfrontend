import {Component, OnInit} from "@angular/core";
import {KeyService} from "../../../shared/service/KeyService";
import {KeyEntity} from "../../../shared/models/KeyEntity";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: "app-keys-dialog",
  templateUrl: "keys-dialog.component.html",
  styleUrls: ["keys-dialog.component.scss"]
})
export class KeysDialogComponent implements OnInit{

  maleKeys: KeyEntity[] = []
  femaleKeys: KeyEntity[] = []
  keys: KeyEntity[] = []

  constructor(private keyService: KeyService,
              public dialogRef: MatDialogRef<KeysDialogComponent>) {
  }

  ngOnInit() {
    this.getKeys();

  }

  getKeys() {
    this.keyService.getKeys().subscribe((keys) => {
      this.keys = keys;
      for(const key of this.keys) {
        if(key.key.startsWith("F")) {
          this.maleKeys.push(key)
        } else {
          this.femaleKeys.push(key);
        }
      }
      this.maleKeys = this.sortKeys(this.maleKeys);
      this.femaleKeys = this.sortKeys(this.femaleKeys)
    })
  }

  sortKeys(keys: KeyEntity[]) {
    return keys.sort((a, b) => {
      return +a.key.slice(1) - +b.key.slice(1);
    })
  }
}
