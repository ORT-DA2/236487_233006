import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Dialog, DialogType, InitialDialogState} from "@core";
import {DialogPayload} from "../utils";

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private _payload: DialogPayload | null = null;
  
  private dialogStateTracker$ = new BehaviorSubject<Dialog>(InitialDialogState);
  dialog$ = this.dialogStateTracker$.asObservable();
  
  openDialog(dialogType: DialogType, payload: DialogPayload | null = null): void {
    this._payload = payload;
    this.dialogStateTracker$.next({ ...this.dialogStateTracker$.value, [dialogType]: true });
  }
  
  closeDialog(dialogType: DialogType): void {
    this._payload = null;
    this.dialogStateTracker$.next({ ...this.dialogStateTracker$.value, [dialogType]: false });
  }
  
  get data() : any | null {
    return this._payload?.data;
  }
  
  get payload() : DialogPayload | null {
    return this._payload;
  }
}





