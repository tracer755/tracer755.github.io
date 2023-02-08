function numbertomonth(number) {
  switch (String(number).replace('0', '')) {
    case '1':
      return ("January");

    case '2':
      return ("February");

    case '3':
      return ("March");

    case '4':
      return ("April");

    case '5':
      return ("May");

    case '6':
      return ("June");

    case '7':
      return ("July");

    case '8':
      return ("August");

    case '9':
      return ("September");

    case '10':
      return ("October");

    case '11':
      return ("November");

    case '12':
      return ("December");
  }
}

function monthtonumber(number) {
  switch (capitalizeFirstLetter(String(number))) {
    case 'January':
      return ("1");

    case 'February':
      return ("2");

    case 'March':
      return ("3");

    case 'April':
      return ("4");

    case 'May':
      return ("5");

    case 'June':
      return ("6");

    case 'July':
      return ("7");

    case 'August':
      return ("8");

    case 'September':
      return ("9");

    case 'October':
      return ("10");

    case 'November':
      return ("11");

    case 'December':
      return ("12");
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}