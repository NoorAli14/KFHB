
import {
    NgxUiLoaderConfig,
    SPINNER,
    POSITION,
    PB_DIRECTION,
  } from 'ngx-ui-loader';

export const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    bgsColor: 'green',
    bgsPosition: POSITION.centerCenter,
    bgsSize: 100,
    bgsType: SPINNER.threeStrings, // background spinner type
    fgsType: SPINNER.rectangleBouncePulseOutRapid, // foreground spinner type
    pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
    pbThickness: 5 // progress bar thickness
  };
  
export const CONFIG = {
    PAGE_SIZE: 5,
    PAGE_SIZE_OPTIONS: [5, 10, 15]
  };


export const REGEX = {
    PASSWORD: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
  };
