import {Injectable} from "@angular/core";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Injectable({providedIn: "root"})
export class BreakpointService {
  constructor(private breakpointObserver: BreakpointObserver) {
  }

  getDevice() {
    return this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait
    ])
  }
}
