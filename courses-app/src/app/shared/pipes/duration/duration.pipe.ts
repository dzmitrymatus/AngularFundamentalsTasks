import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(duration: number): string {
    if(duration < 1) return "00:00";
    let hours = Math.floor(duration / 60);
    let minutes = Math.floor(duration % 60);

    let hoursString: string = hours > 10 ? hours.toString() : '0' + hours;
    let minutesString: string = minutes > 10 ? minutes.toString() : '0' + minutes;

    return `${hoursString}:${minutesString}`;
  }
}
