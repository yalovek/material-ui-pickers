import { DateTextFieldProps } from '../_shared/DateTextField';
import { MaterialUiPickersDate } from '../typings/date';

export const getDisplayDate = ({
  utils,
  value,
  format,
  invalidLabel,
  emptyLabel,
  labelFunc,
}: DateTextFieldProps) => {
  const isEmpty = value === null;
  const date = utils.date(value);

  if (labelFunc) {
    return labelFunc(isEmpty ? null : date, invalidLabel!);
  }

  if (isEmpty) {
    return emptyLabel;
  }

  return utils.isValid(date) ? utils.format(date, format) : invalidLabel;
};

export const getError = (
  value: MaterialUiPickersDate,
  props: DateTextFieldProps
): React.ReactNode => {
  const {
    utils,
    maxDate,
    minDate,
    disablePast,
    disableFuture,
    maxDateMessage,
    minDateMessage,
    invalidDateMessage,
  } = props;

  // if null - do not show error
  if (utils.isNull(value)) {
    return '';
  }

  if (!utils.isValid(value)) {
    return invalidDateMessage;
  }

  if (
    (maxDate && utils.getDiff(utils.date(maxDate), value) >= 0) ||
    (disableFuture && utils.getDiff(utils.date(), value) >= 0)
  ) {
    return maxDateMessage;
  }

  if (
    (minDate && utils.getDiff(utils.date(minDate), value) <= 0) ||
    (disablePast && utils.getDiff(utils.date(), value) <= 0)
  ) {
    return minDateMessage;
  }

  return '';
};
