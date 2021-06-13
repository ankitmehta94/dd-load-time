export const ALERT_WINDOW_MAX = 120;
export const ALERT_WINDOW_MIN = 30;
export const ALERT_WINDOW_DEFAULT = ALERT_WINDOW_MIN;
export const ALERT_WINDOW_STEP = 10;
export const THRESHOLD_MAX = 1.2;
export const THRESHOLD_MIN = 0.1;
export const THRESHOLD_DEFAULT = 0.4;
export const THRESHOLD_STEP = 0.01;
export const TIME_RANGE_MAX = 600;
export const TIME_RANGE_MIN = 30;
export const TIME_RANGE_DEFAULT = TIME_RANGE_MIN;
export const TIME_RANGE_STEP = 10;
export const SAMPLING_RATE = 10;
export const ABOVE_CONDITION_KEY = "ABOVE";
export const BELOW_CONDITION_KEY = "BELOW";
export const SOCKET_ENDPOINT = "http://127.0.0.1:6001";
export const TIME_RANGE_OPTIONS = [
    { value: 30, label: "30s", checked: true, disabled: false },
    { value: 60, label: "1m", checked: false, disabled: true },
    { value: 180, label: "3m", checked: false, disabled: true },
    { value: 300, label: "5m", checked: false, disabled: true },
    { value: 420, label: "7m", checked: false, disabled: true },
    { value: 600, label: "10m", checked: false, disabled: true },
  ]