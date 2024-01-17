import { Pipe } from "@angular/core";

@Pipe({
    name: 'timeDifference'
})
export class TimeDifferencePipe {
    
    transform(value: string): string {
        const dateTime = new Date(value);
        const now = new Date();
        const difference = now.getTime() - dateTime.getTime();
        const differenceInSeconds = Math.floor(difference / 1000);
  
        var dateCreatedString = '';
  
        switch(true) {
          case (differenceInSeconds <= -1): 
                dateCreatedString =  differenceInSeconds + 1 + ' seconds ago';
                break;
          case (differenceInSeconds > -1 && differenceInSeconds < 60): 
                dateCreatedString =  differenceInSeconds + ' seconds ago';
                break;
          case (differenceInSeconds >= 60 && differenceInSeconds < 120): 
                dateCreatedString =  Math.floor(differenceInSeconds / 60) + ' minute ago';
                break;
          case (differenceInSeconds >= 120 && differenceInSeconds < 3600): 
                dateCreatedString =  Math.floor(differenceInSeconds / 60) + ' minutes ago';
                break;
          case (differenceInSeconds >= 3600 && differenceInSeconds < 7200): 
                dateCreatedString =  Math.floor(differenceInSeconds / 3600) + ' hour ago';
                break;
          case (differenceInSeconds >= 7200 && differenceInSeconds < 84000): 
                dateCreatedString =  Math.floor(differenceInSeconds / 3600) + ' hours ago';
                break;
          case (differenceInSeconds >= 84000 && differenceInSeconds < 168000): 
                dateCreatedString =  Math.floor(differenceInSeconds / 84000) + ' day ago';
                break;
          case (differenceInSeconds >= 168000 && differenceInSeconds < 588000): 
                dateCreatedString =  Math.floor(differenceInSeconds / 84000) + ' days ago';
                break;
          case (differenceInSeconds >= 588000 && differenceInSeconds < 1176000): 
                dateCreatedString =  Math.floor(differenceInSeconds / 588000) + ' week ago';
                break;
          case (differenceInSeconds >= 1176000 && differenceInSeconds <= 31622400): 
                dateCreatedString =  Math.floor(differenceInSeconds / 588000) + ' weeks ago';
                break;
          default: dateCreatedString = 'Time format is not right';
        }
  
        return dateCreatedString;
    }
}