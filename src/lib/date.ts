function checkDate(input: string | Date): Date {
  if (typeof input === "string") {
    return convertStringToDate(input);
  } else {
    return input;
  }
}

function convertStringToDate(input: string): Date {
  return new globalThis.Date(input);
}
export function formattedDate(date: Date, showTime: boolean): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "2-digit",
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