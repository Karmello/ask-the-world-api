import dict from 'atw-shared/validation/dictionary'
import { ReportReason } from 'atw-shared/utils/index'

export default {
  type: 'checkReportReasons',
  message: dict.incorrectMsg,
  validator: (value: ReportReason[]) => {
    const reasons = Object.values(ReportReason)
    return !value.some(v => !reasons.includes(v))
  },
}
