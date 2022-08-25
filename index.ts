import './style.css';

import {
  filter,
  fromEvent,
  interval,
  mapTo,
  scan,
  takeUntil,
  takeWhile,
  tap,
} from 'rxjs';

const countDown = document.getElementById('countDown');
const message = document.getElementById('message');
const stopCounter = document.getElementById('stopCounter');

const counter$ = interval(1000);
const stopCounter$ = fromEvent(stopCounter, 'click');

counter$
  .pipe(
    mapTo(-1),
    scan((accumulator, current) => {
      return accumulator + current;
    }, 10),
    tap(console.log),
    takeWhile((value) => value >= 0),
    takeUntil(stopCounter$)
  )
  .subscribe((value) => {
    countDown.innerHTML = value.toString();
    if (!value) {
      message.innerHTML = 'Liftoff!';
    }
  });
