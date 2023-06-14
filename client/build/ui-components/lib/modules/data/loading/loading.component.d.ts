import { OnInit } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import * as i0 from "@angular/core";
export declare class LoadingComponent implements OnInit {
    private router;
    isFullScreen: boolean;
    text: string;
    auto: boolean;
    detectRoutingOnGoing: boolean;
    show$: BehaviorSubject<boolean>;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LoadingComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LoadingComponent, "loading", never, { "isFullScreen": "fullScreen"; "text": "text"; "auto": "auto"; "detectRoutingOnGoing": "detectRoutingOnGoing"; }, {}, never, never, false, never>;
}
