import { ValidationErrorCode, ReportReason } from 'atw-shared/utils'

export default {
  type: 'checkReportReasons',
  message: ValidationErrorCode.Incorrect,
  validator: (value: ReportReason[]) => {
    const reasons = Object.values(ReportReason)
    return !value.some(v => !reasons.includes(v))
  },
}
