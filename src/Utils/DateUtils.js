export function prettyTime(time) {
    var date = new Date(parseInt(time));
    return date.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute:'2-digit',
      second:'2-digit',
    });
  }
  export function prettyTimeWindow(x) {
    return x + 's'
  }