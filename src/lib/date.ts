
// function checkDate(date: Date | string): Date {
//   if (typeof date === Date)
// }

export function formattedDate(date: Date, showTime: boolean): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    if (showTime) {
      options.hour = "2-digit";
      options.minute = "2-digit";
    }

    return date.toLocaleString("en-GB", options);
}

export function isoDate(date: Date): string {
    if (isNaN(date.getTime())) {
        throw new Error("Invalid Date");
    }
    return date.toISOString();
}