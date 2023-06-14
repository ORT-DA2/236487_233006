import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Dialog, DialogType, InitialDialogState} from "@core";
import {DialogPayload} from "../utils";

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogStateTracker$ = new BehaviorSubject<Dialog>(InitialDialogState);
  private payloadState$ = new BehaviorSubject<DialogPayload | null>(null);
  
  dialog$ = this.dialogStateTracker$.asObservable();
  payload$ = this.payloadState$.asObservable();
  
  openDialog(dialogType: DialogType, payload: DialogPayload | null = null): void {
    this.payloadState$.next(payload);
    this.dialogStateTracker$.next({ ...this.dialogStateTracker$.value, [dialogType]: true });
  }
  
  closeDialog(dialogType: DialogType): void {
    this.payloadState$.next(null);
    this.dialogStateTracker$.next({ ...this.dialogStateTracker$.value, [dialogType]: false });
  }
  
  get data() : any | null {
    return this.payloadState$.value?.data;
  }
  
  get payload() : DialogPayload | null {
    return this.payloadState$.value;
  }
}





