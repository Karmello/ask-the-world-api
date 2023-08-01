import AppMsgCode from '../enums/AppMsgCode'
import AppMsgType from '../enums/AppMsgType'

type AppMsg = {
  code?: AppMsgCode
  type: AppMsgType
  text: string
}

export default AppMsg
