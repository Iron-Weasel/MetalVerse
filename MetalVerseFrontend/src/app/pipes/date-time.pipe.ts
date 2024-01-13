import { Pipe } from "@angular/core";

@Pipe({
    name: 'dateTimeFormat'
})
export class DateTimeFormatPipe {


    transform(value: string): string {
      const formatString = value.split("T");
      const date = formatString[0].split("-");
      const time = formatString[1].split(":", 2);
      
      const text = `${date[2]}.${date[1]}.${date[0]}, ${time[0]}:${time[1]}`;
      return text;
    }
}