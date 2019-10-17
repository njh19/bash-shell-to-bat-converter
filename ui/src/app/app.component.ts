import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {convertBashToWin} from '../../../src/convert-bash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit {

  code$: Observable<string>;
  bashScript = new FormControl(`SOME_VAR="/c/cygwin/path"
rm -rf $SOME_VAR`);

  ngOnInit(): void {

    this.code$ = this.bashScript.valueChanges.pipe(
      startWith(this.bashScript.value),
      map(bash => {
        try {
          if(!bash) {
            return 'REM enter bash script :)'
          }
          return convertBashToWin(bash);
        } catch (e) {
          return 'parse error: ' + e; // TODO leave old input and show error separately
        }

      })
    );
  }

  ngAfterViewInit(): void {
  }


}
