export function relativePercentageDifference(initialValue, finalValue) {
  const percentageDifference =
    ((finalValue - initialValue) / initialValue) * 100;
  return percentageDifference.toFixed(2);
}
