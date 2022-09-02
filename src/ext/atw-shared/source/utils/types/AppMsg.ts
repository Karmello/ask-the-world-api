import AppMsgCode from '../enums/AppMsgCode'
import AppMsgType from '../enums/AppMsgType'

type AppMsg = {
  code: AppMsgCode
  message: string
  type: AppMsgType
}

export default AppMsg
